import { pathModuleView, pathModuleTemplate } from '@root';

export class ManagerView implements View {

   public static view(module:string, template:string, view:string, data:any): View {
      const _template = pathModuleTemplate(module, template);
      const _view = pathModuleView(module, view);

      return {
         template: _template,
         data: {
            template: _template,
            view: _view,
            data
         }
      }
   }
}

export interface View {
   template?: string;
   data?: any
}
