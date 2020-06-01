import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { UploadService } from '@model/service/upload-service';

@Service()
export class UploadController {

   constructor(private uploadService:UploadService) { }

   public async index(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         const ctrl = Container.get(UploadController);

         ctrl.uploadService.do('./public/resource/static/upload', request, response, (error:Error) => {
            if (error) {
               return next(error);
            }

            return response.json({});
         });

      } catch (error) {
         return next(error);
      }
   }


}
