
export enum MimetypeEnum {
   JPG = "image/jpg",
   JPEG = "image/jpeg",
   PNG = "image/png",
   PDF = "application/pdf",
   MP4 = "video/mp4"
}

export enum ExtensaoEnum {
   JPG = "jpg",
   JPEG = "jpeg",
   PNG = "png",
   MP4 = "mp4",
   PDF = "pdf"
}

export class Extensao {

   static extensaoPermitda(permitida: ExtensaoEnum[], extensao: string): boolean {
      let ePermitida = false;
      permitida.forEach(temp => {
         if (temp.includes(extensao)) {
            ePermitida = true;
         }
      });
      return ePermitida;
   }

   static mimetypePermitida(permitida: MimetypeEnum[], mimetype: string): boolean {
      let ePermitida = false;
      permitida.forEach(temp => {
         if (temp.includes(mimetype)) {
            ePermitida = true;
         }
      });
      return ePermitida;
   }
}
