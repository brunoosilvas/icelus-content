import { Service } from "typedi";
import { TransactionManager, EntityManager, Transaction, getManager } from "typeorm";

import { GrupoRepository } from '@model/repository/grupo-repository';
import Grupo from '@model/entity/grupo';

@Service()
export class GrupoService {

   constructor(private grupoRepository:GrupoRepository)
   {
   }

   public save(grupo:Grupo): Promise<Grupo> {
      return this.grupoRepository.save(grupo);
   }
}
