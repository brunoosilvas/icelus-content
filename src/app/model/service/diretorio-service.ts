import { Service } from "typedi";

import { readdirSync, existsSync } from 'fs';

import paths from 'path';

import { UtilService } from '@model/service/util-service';
import { Diretorio } from '@model/util/diretorio';
import { Arquivo } from '@model/util/arquivo';

@Service()
export class DiretorioService {

   readonly separador = '/';

   private diretorio:Diretorio;
   private diretorios:Diretorio[];
   private arquivo:Arquivo;
   private arquivos:Arquivo[];

   constructor(private utilService:UtilService) { }

   public raiz(caminho?:string): string {
      if (caminho) {
         return paths.join(paths.resolve('public/resource/static/upload'), caminho);
      }

      return paths.resolve('public/resource/static/upload');
   }

   public getDiretorios(caminhoBase:string, caminho:string): Diretorio[] {

      const root = this.raiz(caminho);

      if (!existsSync(root)) {
         this.diretorio = new Diretorio();
         this.diretorio.base = caminhoBase;
         return [this.diretorio];
      }

      this.diretorios = [];

      if (caminho !== this.separador) {
         let baseAnterior:string;
         baseAnterior = caminhoBase.concat(caminho);
         baseAnterior = this.utilService.replaceConsecutiveChar(baseAnterior, this.separador);
         baseAnterior = this.utilService.removeLastChar(baseAnterior, this.separador);
         baseAnterior = this.utilService.lastCharAt(baseAnterior, this.separador);

         this.diretorio = new Diretorio();
         this.diretorio.anterior = true;
         this.diretorio.link = baseAnterior;

         this.diretorios.push(this.diretorio);
      }

      const baseDiretorios = caminhoBase.concat(caminho);
      readdirSync(root, { withFileTypes: true })
         .filter(item => item.isDirectory())
         .map(item => {
            let pasta:string;
            pasta = baseDiretorios.concat(this.separador).concat(item.name);
            pasta = this.utilService.replaceConsecutiveChar(pasta, this.separador);

            this.diretorio = new Diretorio();
            this.diretorio.anterior = false;
            this.diretorio.nome = item.name;
            this.diretorio.link = pasta;

            this.diretorios.push(this.diretorio);
         });

      return this.diretorios;
   }

   public getArquivos(caminho: string): Arquivo[] {
      this.arquivos = [];
      readdirSync(this.raiz(caminho), { withFileTypes: true })
         .filter(item => !item.isDirectory())
         .map(item => {
            let link = `/static/upload/${caminho}/${item.name}`;
            link = this.utilService.replaceConsecutiveChar(link, this.separador);

            this.arquivo = new Arquivo();
            this.arquivo.extensao = item.name.split('.').pop();
            this.arquivo.nome = item.name.split('.').shift();
            this.arquivo.link = link;

            this.arquivos.push(this.arquivo);
         });

      return this.arquivos;
   }
}
