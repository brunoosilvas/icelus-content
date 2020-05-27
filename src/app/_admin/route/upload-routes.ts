import { Router } from 'express';
import { Container, Service } from 'typedi';

import { Routes, CrudRoutes } from '@env/router';
import { UploadController } from '@module/admin/controller/upload-controller';

@Service()
export class UploadRoutes implements Routes {

   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      const controller = Container.get(UploadController);
      this.router.get(/^([a-z-0-9-\/]+)$/i, controller.index);
   }

   public get routes(): Router {
      return this.router;
   }

}
