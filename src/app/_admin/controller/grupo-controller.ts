import { Request, Response, NextFunction } from 'express';

export class GrupoController {

   public async index(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {
         return response.render('paises/form', { valor: 'dhsuahdasu', status: 1, data: {} });
      } catch (error) {
         return next(error);
      }
   }

   public async edit(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      console.log('teste');
   }
}
