import { Router } from "express";
import { GrupoRoutes } from "@module/admin/route/grupo-routes";

export interface AppRouter {
   initRoutes(): void;
   routes(): Router;
}

export function registerRouterByModule(): void {
   const router:Router = Router();

   router.use('admin/grupo', new GrupoRoutes().routes);


}

export function registerRouterByApi(): void {

}

export function registerRouter(): void {

}
