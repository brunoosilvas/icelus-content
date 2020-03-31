import { MongoRepository, getRepository, getMongoRepository, ObjectID } from 'typeorm';
import { Paises } from '../entity/paises';

export class PaisesService {

  constructor(private paisesRepository: MongoRepository<Paises>) {
    this.paisesRepository = getMongoRepository<Paises>(Paises);
  }

  public save(paises: Paises) {
    return this.paisesRepository.save(paises);
  }

  public remove(paises: Paises) {
    return this.paisesRepository.remove(paises);
  }

}
