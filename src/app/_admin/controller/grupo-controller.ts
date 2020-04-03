import { Request, Response, NextFunction } from 'express';
import { path } from '@root';

export class GrupoController {

   public async registrar(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {
         return response.render(path('_admin/grupo/_layout'), { template: path('_admin/template/layout'), view: path('_admin/grupo/registrar')});
      } catch (error) {
         return next(error);
      }
   }

   public async edit(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {
         return response.render('paises/form', { valor: 'dhsuahdasu', status: 1, data: {} });
      } catch (error) {
         return next(error);
      }
   }
}
