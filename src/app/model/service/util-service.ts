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

   public lastCharAt(value:string, char:string) {
      return value.substr(0, value.lastIndexOf(char))
   }
}
