import { Repository, getRepository, Transaction, getMongoRepository, MongoRepository } from "typeorm";
import { Bairros } from "../entity/Bairros";


export class BairrosService {

    private bairrosRepository:MongoRepository<Bairros>;

    constructor() {
        this.bairrosRepository = getMongoRepository<Bairros>(Bairros);
    }

    public listAll() {
        return this.bairrosRepository.find();
    }
}
