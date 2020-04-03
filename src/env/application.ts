import express, { Router, json } from 'express';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { createConnection, ConnectionOptions, Connection, getConnection } from 'typeorm';

import ormconfig from '@model/config/ormconfig.json';
import Paises from '@model/entity/paises';

import { Ports } from '@env/ports';
import { registerRouter, registerRouterByApi, registerRouterByModule } from '@env/router';

import { GrupoRoutes } from '@module/admin/route/grupo-routes';

export class Application {

   private express: express.Application;

   constructor() {
      this.express = express();
   }

   public envioriment(): express.Application {
      return this.express;
   }

   public bootstrap(): Promise<Connection> {
      return createConnection(this.mapEntities());
   }

   public run(port: Ports, hasConnectionFromDatabase: boolean): void {

      this.express.use(cors({ origin: '*' }));
      this.express.use(helmet());
      this.express.use(json());
      this.express.use(compression());

      this.express.use(express.static('public/resources'));
      this.express.set('views', 'public/views');
      this.express.set('view engine', 'ejs');

      // registerRouter();
      // registerRouterByApi();
      registerRouterByModule(this.express);

      // this.teste(this.express);

      this.express.listen(port, () => {
         console.log('ativo...');
      });
      this.express.on('close', () => {
         const connection:Connection = getConnection();
         if (connection != null) {
            connection.close();
         }
      });
   }

   private teste(router: Router): void {
      router.use('', new GrupoRoutes().routes);
   }

   private mapEntities(): ConnectionOptions {
      ormconfig.entities.push(Paises);

      return ormconfig as ConnectionOptions;
   }

}
