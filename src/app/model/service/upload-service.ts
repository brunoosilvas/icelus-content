import { Service } from "typedi";

import { Request, Response, NextFunction } from "express";
import multer from 'multer';

import * as SocketIO from 'socket.io';

import { UtilService } from '@model/service/util-service';
import { DiretorioService } from '@model/service/diretorio-service';
import { ConfiguracaoService } from '@model/service/configuracao-service';
import { Configuracao } from "@model/entity/configuracao";

@Service()
export class UploadService {

   constructor(private configuracaoService:ConfiguracaoService,
      private diretorioService:DiretorioService,
      private utilService:UtilService) { }

   public do(path:string, request:Request, response:Response,
      callback: (error:Error) => void): void {

      let count = 0;
      const storage = multer.diskStorage({
         destination: (_request, file, _callback) => {
            _callback(null, path);
         },
         filename: (_request, file, _callback) => {
            count++;

            const size = request.body.size as number;
            const percentual = Math.floor((count / size) * 100);
            const socketio = _request.app.get('socketio') as SocketIO.Server;
            socketio.emit('upload', { percentual, concluido: percentual === 100 ? true : false });

            const extesion = this.utilService.extensionFile(file.originalname);
            const name = this.utilService.nameFile(file.originalname);
            const nameOutput = `${this.utilService.normalize(name)}.${extesion}`;

            _callback(null, nameOutput);
         }
      });

      const fileFilter = (_request: any, file: any, _callback:any) => {
         if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "application/pdf") {
            _callback(null, true);
         } else {
            _callback(new Error(`Arquivo ${file.originalname} não permitido para upload. Verifique as extensões permitidas.`), false);
         }
      }

      const upload = multer({ storage, fileFilter }).any();
      upload(request, response, (error) => {
         callback(error);
      });
   }

   public thumbnail(configuracao:Configuracao, nome:string, saida:string, extensao:string): void {
      if (!(extensao === "jpg" || extensao === "jpeg" || extensao === "png")) {
         return;
      }
      const sharp = require('sharp');
      configuracao.thumbnail.thumbnails.forEach(async thumbnail => {
         await sharp(nome, { failOnError: false })
            .rotate()
            .resize({
               width: thumbnail.tamanho,
               height: thumbnail.tamanho,
               fit: sharp.fit.contain,
               position: sharp.strategy.contain
            })
            .toFile(`${saida}-${thumbnail.tamanho}x${thumbnail.tamanho}.${extensao}`);
      });
   }
}
