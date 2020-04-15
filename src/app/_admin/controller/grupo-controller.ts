import { Request, Response, NextFunction } from 'express';
import Container, { Service, Inject } from 'typedi';
import { getManager, ObjectType } from 'typeorm';

import { pathModuleView, pathModuleTemplate } from '@root';

import { Grupo } from '@model/entity/grupo';
import { GrupoService } from '@model/service/grupo-service';

import { View, ManagerView } from '@view/manager-view';

import ejs from 'ejs';

@Service()
export class GrupoController {

   constructor(private grupoService:GrupoService)
   {
   }

   public async registrar(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {



/*         const controller = Container.get(GrupoController);

         const grupo:Grupo = null;
         grupo.codigoInep = 21212;
         grupo.nacionalidade = 'dshaudhusahu';

         await controller.grupoService.save(grupo);*/



         const view = ManagerView.view('_admin', 'template/_layout', 'grupo/registrar', {});
         return response.render(view.template, view.data);
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
