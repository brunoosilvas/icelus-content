import { Request, Response, NextFunction } from 'express';
import Container, { Service, Inject } from 'typedi';

import { ManagerView } from '@view/manager-view';

@Service()
export class UploadController {

   public async index(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {




         const view = ManagerView.view('_admin', '_template/_layout', 'upload/index', {});
         return response.render(view.template, view.data);
      } catch (error) {
         return next(error);
      }
   }

}
