import { Router } from 'express';

import { Routes, CrudRoutes } from '@env/router';

import { GrupoController } from '@module/admin/controller/grupo-controller';

export class GrupoRoutes implements Routes {

   private readonly controller:GrupoController = new GrupoController();
   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      // this.router.get(CrudRoutes.padrao, this.controller.index);
      // this.router.get(CrudRoutes.paginar, this.controller.index);
      // this.router.get(CrudRoutes.editar, this.controller.edit);
      this.router.get(CrudRoutes.registar, this.controller.registrar);
   }

   public get routes(): Router {
      return this.router;
   }

}
