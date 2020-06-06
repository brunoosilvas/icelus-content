import { Service } from "typedi";

import { ConfiguracaoRepository } from '@model/repository/configuracao-repository';
import { Configuracao } from "@model/entity/configuracao";

@Service()
export class ConfiguracaoService {

   constructor(private configuracaoRepository:ConfiguracaoRepository) { }

   public get(): Promise<Configuracao> {
      return this.configuracaoRepository.get();
   }

}
