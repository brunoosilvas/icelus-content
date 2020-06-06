import { Request, Response, NextFunction } from 'express';
import Container, { Service, Inject } from 'typedi';

import { ManagerView } from '@view/manager-view';
import { DiretorioService } from '@model/service/diretorio-service';
import { ConfiguracaoService } from '@model/service/configuracao-service';


@Service()
export class UploadController {

   constructor(private diretorioService: DiretorioService,
      private configuracaoService: ConfiguracaoService) { }

   public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
      try {

         const ctrl = Container.get(UploadController);
         const diretorios = ctrl.diretorioService.getDiretorios(request.baseUrl, request.url);

         const configuracao = await ctrl.configuracaoService.get();
         const arquivos = ctrl.diretorioService.getArquivos(configuracao, request.url);

         const view = ManagerView.view('_admin', '_template/_layout', 'upload/index', {
            caminho: request.url,
            diretorios,
            arquivos
         });
         return response.render(view.template, view.data);
      } catch (error) {
         return next(error);
      }
   }

}
