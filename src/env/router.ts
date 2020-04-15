import { Router, NextFunction } from 'express';
import Container from 'typedi';

import { GrupoRoutes } from "@module/admin/route/grupo-routes";
import { ComponenteRoutes } from '@module/api/route/componente-routes';

export interface Routes {
   initRoutes(): void;
}

export function registerRouterByModule(router: Router): void {
   router.use('/admin/grupo', Container.get(GrupoRoutes).routes);
}

export function registerRouterByApi(router: Router): void {
   router.use('/api', Container.get(ComponenteRoutes).routes);
}

export function registerRouter(): void {

}

export class CrudRoutes {

   public static readonly padrao = /^\/$/i;
   public static readonly paginar = /^\/(?:([0-9]+?))\/paginar$/i;
   public static readonly editar = /^\/(?:([0-9]+?))\/editar$/i;
   public static readonly registar = /^\/registrar$/i;

}
