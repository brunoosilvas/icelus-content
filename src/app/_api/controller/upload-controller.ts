import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { DiretorioService } from '@model/service/diretorio-service';

import path from 'path';

@Service()
export class UploadController {

   constructor(private diretorioService:DiretorioService) { }

   public async index(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         /*const ctrl = Container.get(UploadController);
         const basedir = path.resolve(ctrl.diretorioService.root());


         console.log(ctrl.diretorioService.root());
         console.log(ctrl.diretorioService.paths(basedir))*/


         return response.json({});
      } catch (error) {
         return next(error);
      }
   }

}
