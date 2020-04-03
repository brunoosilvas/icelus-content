import { Request, Response, NextFunction } from 'express';
import { pathModuleView, pathModuleTemplate } from '@root';

export class GrupoController {

   public async registrar(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {


         const render = pathModuleTemplate('_admin', 'grupo/_layout');
         const template = pathModuleTemplate('_admin', 'template/_layout');
         const view = pathModuleView('_admin', 'grupo/registrar');

         return response.render(render, { template, view });
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
