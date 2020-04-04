import { Router } from 'express';
import { Container, Service } from 'typedi';

import { Routes, CrudRoutes } from '@env/router';
import { GrupoController } from '@module/admin/controller/grupo-controller';

@Service()
export class GrupoRoutes implements Routes {

   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      const controller = Container.get(GrupoController);
      // this.router.get(CrudRoutes.padrao, this.controller.index);
      // this.router.get(CrudRoutes.paginar, this.controller.index);
      // this.router.get(CrudRoutes.editar, this.controller.edit);
      this.router.get(CrudRoutes.registar, controller.registrar);
   }

   public get routes(): Router {
      return this.router;
   }

}
