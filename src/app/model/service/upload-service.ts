import { Service } from "typedi";
import { Request, Response } from "express";

import multer from 'multer';
import sharp from 'sharp';

import * as SocketIO from 'socket.io';

import { UtilService } from '@model/service/util-service';
import { DiretorioService } from '@model/service/diretorio-service';
import { Thumbnail } from '@model/entity/embed/thumbnail';

@Service()
export class UploadService {

   constructor(private diretorioService:DiretorioService,
      private utilService:UtilService) { }

   public do(request:Request, response:Response,
      callback: (error:Error) => void): void {

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

            const size = request.body.size as number;
            const percentual = Math.floor((count / size) * 100);

            const socketio = _request.app.get('socketio') as SocketIO.Server;
            socketio.emit('upload', { nome: `${nome}.${extensao}`, percentual, concluido: percentual === 100 ? true : false });

            _callback(null, nomeSaida);
         }
      });

      const fileFilter = (_request: any, _file: any, _callback:any) => {
         if (_file.mimetype === "image/jpg" ||
            _file.mimetype === "image/jpeg" ||
            _file.mimetype === "image/png" ||
            _file.mimetype === "application/pdf" ||
            _file.mimetype === "video/mp4") {
            _callback(null, true);
         } else {
            _callback(new Error(`Arquivo ${_file.originalname} não permitido para upload. Verifique as extensões permitidas.`), false);
         }
      }

      const upload = multer({ storage, fileFilter }).any();
      upload(request, response, (error) => { callback(error); });
   }

   public thumbnail(thumbnail:Thumbnail, nome:string, saida:string, extensao:string): Promise<sharp.OutputInfo> {
      if (!(extensao === "jpg" || extensao === "jpeg" || extensao === "png")) {
         return null;
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
