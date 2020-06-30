import { Service } from "typedi";
import { Request, Response } from "express";

import multer from 'multer';
import sharp from 'sharp';

import * as SocketIO from 'socket.io';

import { Thumbnail } from '@model/entity/embed/thumbnail';

import { UtilService } from '@model/service/util-service';
import { DiretorioService } from '@model/service/diretorio-service';
import { SocketService } from '@model/service/socket-service';
import { ExtensaoEnum, MimetypeEnum, Extensao } from '@model/util/extensao';

@Service()
export class UploadService {

   private mimetypePermitidaParaUpload = [
      MimetypeEnum.JPG,
      MimetypeEnum.JPEG,
      MimetypeEnum.MP4,
      MimetypeEnum.PDF,
      MimetypeEnum.MP4
   ];

   private extensaoPermitidaParaThumbnail = [
      ExtensaoEnum.JPEG,
      ExtensaoEnum.JPG,
      ExtensaoEnum.PNG
   ]

   constructor(private diretorioService: DiretorioService,
      private utilService: UtilService,
      private socketService: SocketService) { }

   public do(request: Request, response: Response,
      callback: (error:Error) => void): void {

      const socketio = request.app.get('socketio')

      let count = 0;
      const storage = multer.diskStorage({
         destination: (_request, file, _callback) => {
            const caminho = this.diretorioService.raiz(_request.body.path);
            _callback(null, caminho);
         },
         filename: (_request, _file, _callback) => {
            count++;

            const extensao = this.utilService.extensionFile(_file.originalname);
            const nome = this.utilService.nameFile(_file.originalname);
            const nomeSaida = `${this.utilService.normalize(nome)}.${extensao}`;

            const size = _request.body.size as number;
            const percentual = Math.floor((count / size) * 100);

            this.socketService.send(socketio, 'upload', {
               nome: `${nome}.${extensao}`,
               percentual,
               concluido: percentual === 100 ? true : false
            });

            _callback(null, nomeSaida);
         }
      });

      const fileFilter = (_request: any, _file: any, _callback: any) => {
         const ePermitida = Extensao.mimetypePermitida(this.mimetypePermitidaParaUpload, _file.mimetype);
         if (ePermitida) {
            _callback(null, true);
         } else {
            _callback(new Error(`Arquivo ${_file.originalname} não permitido para upload. Verifique as extensões permitidas.`), false);
         }
      }

      const upload = multer({ storage, fileFilter }).any();
      upload(request, response, (error) => { callback(error); });
   }

   public thumbnail(thumbnail: Thumbnail, nome: string, saida: string, extensao: string): Promise<sharp.OutputInfo> {

      const saoPermitida = Extensao.extensaoPermitda(this.extensaoPermitidaParaThumbnail, extensao);

      if (!saoPermitida) {
         return Promise.resolve(null);
      }

      return sharp(nome, { failOnError: false })
         .rotate()
         .resize({
            width: thumbnail.tamanho,
            height: thumbnail.tamanho,
            fit: sharp.fit.contain,
            position: sharp.strategy.entropy
         })
         .toFile(`${saida}-${thumbnail.tamanho}x${thumbnail.tamanho}.${extensao}`);

   }
}
