import { Request, Response, NextFunction } from 'express';
import Container, { Service, Inject } from 'typedi';

import { ManagerView } from '@view/manager-view';
import { DiretorioService } from '@model/service/diretorio-service';

@Service()
export class UploadController {

   constructor(private diretorioService:DiretorioService) { }

   public async index(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         const ctrl = Container.get(UploadController);
         const diretorios = ctrl.diretorioService.paths(request.baseUrl, request.url);

         const view = ManagerView.view('_admin', '_template/_layout', 'upload/index', { diretorios });
         return response.render(view.template, view.data);
      } catch (error) {
         return next(error);
      }
   }

}
