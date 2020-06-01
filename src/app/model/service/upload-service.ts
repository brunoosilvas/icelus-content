import { Service } from "typedi";
import { UtilService } from '@model/service/util-service';
import { DiretorioService } from '@model/service/diretorio-service';

import multer from 'multer';
import { Request, Response, NextFunction } from "express";
import * as SocketIO from 'socket.io';

@Service()
export class UploadService {

   constructor(private diretorioService:DiretorioService,
      private utilService:UtilService) { }

   public do(path:string, request:Request, response:Response,
      callback: (error:Error) => void): void {

      let count = 0;
      const storage = multer.diskStorage({
         destination: (_request, file, _callback) => {
            _callback(null, path);
         },
         filename: (_request, file, _callback) => {
            const size = request.body.size as number;
            count++;
            const percentual = Math.floor((count / size) * 100);
            const socketio = _request.app.get('socketio') as SocketIO.Server;
            socketio.emit('upload', { percentual });
            _callback(null, file.originalname);
         }
      });

      const upload = multer({ storage }).any();
      upload(request, response, (error) => {
         callback(error);
      });
   }
}
