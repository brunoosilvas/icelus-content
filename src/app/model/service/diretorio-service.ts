import { Service } from "typedi";

import { readdirSync, existsSync } from 'fs';

import paths from 'path';

import { UtilService } from '@model/service/util-service';
import { Diretorio } from '@model/util/diretorio';

@Service()
export class DiretorioService {

   readonly separator = '/';

   private folder:Diretorio;
   private folders:Diretorio[] = [];

   constructor(private utilService:UtilService) { }

   public root(path?:string): string {
      if (path) {
         return paths.join(paths.resolve('public/resource/static/upload'), path);
      }

      return paths.resolve('public/resource/static/upload');
   }

   public paths(base:string, path:string): Diretorio[] {

      const root = this.root(path);

      if (!existsSync(root)) {
         this.folder = new Diretorio();
         this.folder.base = base;
         return [this.folder];
      }

      this.folders = [];

      if (path !== this.separator) {
         let basePrevious:string;
         basePrevious = base.concat(path);
         basePrevious = this.utilService.replaceConsecutiveChar(basePrevious, this.separator);
         basePrevious = this.utilService.removeLastChar(basePrevious, this.separator);
         basePrevious = this.utilService.lastCharAt(basePrevious, this.separator);

         this.folder = new Diretorio();
         this.folder.anterior = true;
         this.folder.link = basePrevious;

         this.folders.push(this.folder);
      }

      const baseFolders = base.concat(path);
      const moreFolders = readdirSync(root, { withFileTypes: true })
         .filter(item => item.isDirectory())
         .map(item => {
            let folder:string;
            folder = baseFolders.concat(this.separator).concat(item.name);
            folder = this.utilService.replaceConsecutiveChar(folder, this.separator);

            this.folder = new Diretorio();
            this.folder.anterior = false;
            this.folder.link = folder;
            this.folder.nome = item.name;

            this.folders.push(this.folder);
         });

      return this.folders;
   }

   public files(path: string): string[] {
      return readdirSync(path, { withFileTypes: true })
         .filter(item => !item.isDirectory())
         .map(item => item.name);
   }
}
