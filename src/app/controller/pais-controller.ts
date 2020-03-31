import { Request, Response, NextFunction } from 'express';

export default class PaisController {

   public async teste2(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
      return res.json({ valor: 'dsauhsauhdsa'});
   }

   public async teste(req:Request, res:Response, next:NextFunction): Promise<Response | void> {
      try {
         console.log(req.params[0]);
         console.log(req.params[1]);
         console.log(req.params[2]);
         return res.render('paises/form', { valor: 'dhsuahdasu', status: 1, data: {} });
      } catch (error) {
         return next(error);
      }
   }
}
