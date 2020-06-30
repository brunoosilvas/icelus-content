
import { Service } from "typedi";
import * as SocketIO from 'socket.io';

@Service()
export class SocketService {

   public send(server: SocketIO.Server, event: string, data: any): void {
      server.emit(event, data);
   }

}
