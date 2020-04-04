import { Service } from "typedi";
import { GrupoRepository } from '@model/repository/grupo-repository';

@Service()
export class GrupoService {

   constructor(private grupoRepository:GrupoRepository) {
      console.log(grupoRepository);
   }

}
