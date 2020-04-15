import { Service } from 'typedi';
import { getMongoRepository, MongoRepository } from 'typeorm';

import { Componente } from '@model/entity/componente';

@Service()
export class ComponenteRepository {

   private repository:MongoRepository<Componente>;

   constructor() {
      this.repository = getMongoRepository(Componente);
   }

   public async buscar(): Promise<Componente[]> {
      return this.repository.find({});
   }

}
