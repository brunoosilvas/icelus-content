import { Service } from "typedi";
import { GrupoRepository } from '@model/repository/grupo-repository';

@Service()
export class ConteudoService {

   constructor(private grupoRepository:GrupoRepository) {
      console.log(grupoRepository);
   }



}
