import { Router } from 'express';
import { Container, Service } from 'typedi';

import { Routes } from '@env/router';
import { ComponenteController } from '@module/api/controller/componente-controller';

@Service()
export class ComponenteRoutes implements Routes {

   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      const controller = Container.get(ComponenteController);
      this.router.get('/componente', controller.buscar);
   }

   public get routes(): Router {
      return this.router;
   }

}
