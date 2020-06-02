import { Service } from "typedi";

@Service()
export class UtilService {

   public removeLastChar(value:string, char:string): string {
      const posLastChar = value.length - 1;
      if (value.charAt(posLastChar) === char) {
         value = value.substr(0, posLastChar);
      }
      return value;
   }

   public replaceConsecutiveChar(value:string, char:string): string {
      return value.replace(/\/{2,}/g, char);
   }

   public lastCharAt(value:string, char:string): string{
      return value.substr(0, value.lastIndexOf(char))
   }

   public normalize(value:string):string {
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
         .replace(/([^\w]+|\s+|\_+)/g, '-') // Substitui espaço e outros caracteres por hífen
         .replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
         .replace(/(^-+|-+$)/, '') // Remove hífens extras do final ou do inicio da string
         .toLowerCase();
   }

   public extensionFile(value:string): string {
      return value.split('.').pop();
   }
   public nameFile(value:string): string {
      return value.split('.').shift();
   }
}
