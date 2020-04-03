import * as root from 'path';

const views:string = 'public/views';

export function pathView(path:string) {
   return root.resolve(__dirname, '..', views, path);
}

export function pathModuleView(module:string, path:string) {
   return root.resolve(__dirname, '..', views, module, path);
}

export function pathTemplate(path:string) {
   return root.resolve(__dirname, '..', views, path);
}

export function pathModuleTemplate(module:string, path:string) {
   return root.resolve(__dirname, '..', views, module, path);
}
