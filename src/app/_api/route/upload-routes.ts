import { Router } from 'express';
import { Container, Service } from 'typedi';

import { Routes } from '@env/router';
import { UploadController } from '@module/api/controller/upload-controller';

@Service()
export class UploadRoutesApi implements Routes {

   private router:Router = Router();

   constructor() {
      this.initRoutes();
   }

   public initRoutes(): void {
      const controller = Container.get(UploadController);
      this.router.get('/upload', controller.teste);
   }

   public get routes(): Router {
      return this.router;
   }

}
