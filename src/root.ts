import * as root from 'path';

export function path(union:string) {
   return root.resolve(__dirname, '..', 'public/views', union);
}
