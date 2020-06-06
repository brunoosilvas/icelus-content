import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { UploadService } from '@model/service/upload-service';
import { DiretorioService } from '@model/service/diretorio-service';
import { UtilService } from '@model/service/util-service';

@Service()
export class UploadController {

   constructor(private diretorioService: DiretorioService,
      private uploadService: UploadService,
      private utilService: UtilService) { }

   public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
      try {

         const ctrl = Container.get(UploadController);

         ctrl.uploadService.do('./public/resource/static/upload', request, response, (error: Error) => {
            if (error) {
               return next(error);
            }

            const files = request.files as any
            for (const file of files) {

               const nameFile = ctrl.diretorioService.file(file.destination, file.filename);
               let nameOutput = '';

               nameOutput = `${ctrl.utilService.nameFile(file.filename)}-150x150.${ctrl.utilService.extensionFile(file.filename)}`
               nameOutput = ctrl.diretorioService.file(file.destination, nameOutput);

               ctrl.uploadService.thumbnail(nameFile, nameOutput, 150, 150);
            }

            return response.json({});
         });

      } catch (error) {
         return next(error);
      }
   }


}
