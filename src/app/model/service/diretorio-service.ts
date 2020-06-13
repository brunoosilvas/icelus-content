import { Service } from "typedi";

import { readdirSync, existsSync } from 'fs';

import paths from 'path';

import { UtilService } from '@model/service/util-service';
import { Diretorio } from '@model/util/diretorio';
import { Arquivo } from '@model/util/arquivo';
import { Configuracao } from "@model/entity/configuracao";

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

   public file(path:string, file:string): string {
      return paths.join(paths.resolve(path), file);
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

   public getArquivos(configuracao:Configuracao, caminho: string): Arquivo[] {
      const thumbnail = configuracao.thumbnail;
      const tamanho = `${thumbnail.padrao.tamanho}x${thumbnail.padrao.tamanho}`;

      this.arquivos = [];
      readdirSync(this.raiz(caminho), { withFileTypes: true })
         .filter(item => !item.isDirectory())
         .map(item => {
            const extensao = this.utilService.extensionFile(item.name);
            if (item.name.includes(tamanho)) {
               let thubnail = `/static/upload/${caminho}/${item.name}`;
               thubnail = this.utilService.replaceConsecutiveChar(thubnail, this.separador);

               this.arquivo = new Arquivo();
               this.arquivo.extensao = item.name.split('.').pop();
               this.arquivo.nome = item.name.split('.').shift().replace(`-${tamanho}`, '');
               this.arquivo.link = thubnail.replace(`-${tamanho}`, '');
               this.arquivo.thumbnail = thubnail;

               this.arquivos.push(this.arquivo);
            } else if (extensao === "pdf") {
               let link = `/static/upload/${caminho}/${item.name}`;
               link = this.utilService.replaceConsecutiveChar(link, this.separador);

               let thubnail = `/static/img/system/pdf-thumbnail.png`;
               thubnail = this.utilService.replaceConsecutiveChar(thubnail, this.separador);

               this.arquivo = new Arquivo();
               this.arquivo.extensao = item.name.split('.').pop();
               this.arquivo.nome = item.name.split('.').shift();
               this.arquivo.link = link;
               this.arquivo.thumbnail = thubnail;

               this.arquivos.push(this.arquivo);
            }

         });

      return this.arquivos;
   }
}
