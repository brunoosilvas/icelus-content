import { Router } from 'express';

import { AppRouter } from '@env/router';

import { GrupoController } from '@module/admin/controller/grupo-controller';

export class ConteudoController implements AppRouter {

   private readonly controller:GrupoController = new GrupoController();
   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      // obs Hanlder é aceito varios nas rotas ele pode retornar void ou Promisse<any>
      // this.routes.get('', this.controller.teste2);
      // this.router.get(/^\/(?:([a-z\-]+?))\/(?:([0-9]+?))\/(?:([a-z0-9\-]+?))$/i, this.controller.teste);

   }

   public routes(): Router {
      return this.router;
   }

}
