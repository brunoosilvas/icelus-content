import { AppRouter } from '@env/router';
import { Router } from 'express';

import PaisController from '@controller/pais-controller';

export class PaisRoutes implements AppRouter {

   private readonly controller:PaisController = new PaisController();
   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      // obs Hanlder é aceito varios nas rotas ele pode retornar void ou Promisse<any>
      this.router.get('', this.controller.teste2);
      this.router.get(/^\/(?:([a-z\-]+?))\/(?:([0-9]+?))\/(?:([a-z0-9\-]+?))$/i, this.controller.teste);
   }

   public routes(): Router {
      return this.router;
   }

}
