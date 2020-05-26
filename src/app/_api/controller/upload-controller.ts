import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { DiretorioService } from '@model/service/diretorio-service';

import path from 'path';

@Service()
export class UploadController {

   constructor(private diretorioService:DiretorioService) {
      console.log('aqui...');
   }

   public async teste(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         const controller = Container.get(UploadController);
         const basedir = path.resolve('public/resource/static/upload');

         console.log(controller.diretorioService.paths(basedir))


         return response.json({});
      } catch (error) {
         return next(error);
      }
   }

}
