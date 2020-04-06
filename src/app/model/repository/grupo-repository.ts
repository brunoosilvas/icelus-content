import { Service } from 'typedi';
import { getMongoRepository, MongoRepository } from 'typeorm';

import Grupo from '@model/entity/grupo';

@Service()
export class GrupoRepository {

   private repository:MongoRepository<Grupo>;

   constructor() {
      this.repository = getMongoRepository(Grupo);
   }

   public async find(): Promise<Grupo[]> {
      return this.repository.find({});
   }

   public async save(grupo:Grupo): Promise<Grupo> {
      return this.repository.save(grupo);
   }
}
