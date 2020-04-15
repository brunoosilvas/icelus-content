import { Service } from "typedi";

import { ComponenteRepository } from '@model/repository/componente-repository';
import { Componente } from "@model/entity/componente";

@Service()
export class ComponenteService {

   constructor(private componenteRepository:ComponenteRepository) { }

   public buscar(): Promise<Componente[]> {
      return this.componenteRepository.buscar();
   }

}
