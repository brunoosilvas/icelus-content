import { Request, Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';

import { UploadService } from '@model/service/upload-service';
import { DiretorioService } from '@model/service/diretorio-service';
import { UtilService } from '@model/service/util-service';
import { ConfiguracaoService } from '@model/service/configuracao-service';
import { Arquivo } from '@model/util/arquivo';
import { Resposta } from '@model/util/resposta';

@Service()
export class UploadController {

   constructor(private configuracaoService:ConfiguracaoService,
      private diretorioService: DiretorioService,
      private uploadService: UploadService,
      private utilService: UtilService) { }

   public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
      try {

         const ctrl = Container.get(UploadController);

         ctrl.uploadService.do(request, response, async (error: Error) => {

            if (error) {
               return next(error);
            }

            const configuracao = await ctrl.configuracaoService.get();
            const files = request.files as Express.Multer.File[];
            const arquivos:Arquivo[] = [];

            const size = files.length;
            let count = 0;

            for (const file of files) {
               count++;

               const nomeSaida = ctrl.utilService.nameFile(file.filename);
               const nomeArquivo = ctrl.diretorioService.file(file.destination, file.filename);
               const nomeArquivoSaida = ctrl.diretorioService.file(file.destination, nomeSaida);
               const extensao = ctrl.utilService.extensionFile(file.filename);

               const percentual = Math.floor((count / size) * 100);

               const socketio = request.app.get('socketio') as SocketIO.Server;
               socketio.emit('upload', { percentual, concluido: percentual === 100 ? true : false });

               for (const thumbnail of configuracao.thumbnail.thumbnails) {
                  await ctrl.uploadService.thumbnail(thumbnail, nomeArquivo, nomeArquivoSaida, extensao);
               }
            }

            const resposta = new Resposta<Arquivo>();
            resposta.values = ctrl.diretorioService.getArquivos(configuracao, request.body.path);

            return response.json(resposta);
         });

      } catch (error) {
         return next(error);
      }
   }


}
