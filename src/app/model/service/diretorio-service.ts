import { Service } from "typedi";

import { readdirSync, statSync } from 'fs';

@Service()
export class DiretorioService {

   public paths(path: string): string[] {
      return readdirSync(path, { withFileTypes: true })
         .filter(item => item.isDirectory())
         .map(item => item.name);
   }

   public files(path: string): string[] {
      return readdirSync(path, { withFileTypes: true })
         .filter(item => !item.isDirectory())
         .map(item => item.name);
   }
}
