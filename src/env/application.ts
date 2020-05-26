import express, { Request, Response, NextFunction, Router, json } from 'express';
import * as SocketIO from 'socket.io';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { createConnection, ConnectionOptions, Connection, getConnection } from 'typeorm';

import ormconfig from '@model/config/ormconfig.json';
import { Grupo } from '@model/entity/grupo';
import { Componente } from '@model/entity/componente';

import { Ports } from '@env/ports';

import { registerRouter, registerRouterByApi, registerRouterByModule } from '@env/router';

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

      this.express.use(express.static('public/resource'));
      this.express.set('views', 'public/view');
      this.express.set('view engine', 'ejs');

      // registerRouter();
      registerRouterByApi(this.express);
      registerRouterByModule(this.express);

      // this.registerErrorHandler(this.express);
      this.registerNotfoundHandler(this.express);

      this.express.on('close', () => {
         const connection: Connection = getConnection();
         if (connection != null) {
            connection.close();
         }
      });

      const server = this.express.listen(port, () => {
         console.log(`Servidor online na porta: ${port}`);
         this.express.set('socketio', SocketIO.listen(server));
      });
   }

   private registerErrorHandler(router: Router): Response | void {
      router.use((error: Error, request: Request, response: Response, next: NextFunction) => {
         console.log(error.message);
         // response.send('dhsauhduhusahduas');
         return response.status(500).send('dshuhaduhsauhdsa');
      });
   }

   private registerNotfoundHandler(router: Router): Response | void {
      router.get('*', (request: Request, response: Response) => {
         return response.status(404).send('erro 404');
      });
   }


   private mapEntities(): ConnectionOptions {
      ormconfig.entities.push(Grupo);
      ormconfig.entities.push(Componente);

      return ormconfig as ConnectionOptions;
   }

}
