import { Request, Response, NextFunction } from 'express';
import Container, { Service, Inject } from 'typedi';
import { getManager, ObjectType } from 'typeorm';

import { pathModuleView, pathModuleTemplate } from '@root';

import Grupo from '@model/entity/grupo';
import { GrupoService } from '@model/service/grupo-service';

@Service()
export class GrupoController {

   constructor(private grupoService:GrupoService)
   {
   }

   public async registrar(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         const controller = Container.get(GrupoController);

         const grupo:Grupo = null;
         grupo.codigoInep = 21212;
         grupo.nacionalidade = 'dshaudhusahu';

         await controller.grupoService.save(grupo);

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
