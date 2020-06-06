import { Service } from 'typedi';
import { getMongoRepository, MongoRepository } from 'typeorm';

import { Configuracao } from '@model/entity/configuracao';

@Service()
export class ConfiguracaoRepository {

   private repository:MongoRepository<Configuracao>;

   constructor() {
      this.repository = getMongoRepository(Configuracao);
   }

   public async get(): Promise<Configuracao> {
      return this.repository.findOne({ cache: true });
   }

}
