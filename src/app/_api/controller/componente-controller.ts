import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { Componente } from '@model/entity/componente';
import { ComponenteService } from '@model/service/componente-service';

import GenericResponse from '@module/api/model/generic-response';

@Service()
export class ComponenteController {

   constructor(private componenteService:ComponenteService)
   {
   }

   public async buscar(request:Request, response:Response, next:NextFunction): Promise<Response | void> {
      try {

         const controller = Container.get(ComponenteController);
         const send = new GenericResponse<Componente>();
         send.values = await controller.componenteService.buscar();

         return response.json(send);
      } catch (error) {
         return next(error);
      }
   }


}
