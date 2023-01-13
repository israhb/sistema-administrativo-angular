import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ToolsService } from 'app/service/tools/tools.service';

@Directive({
  selector: '[appRolesModulos]'
})
export class RolesModulosDirective {
    permisos: string;
    scopes: any[];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private toolsService:ToolsService,
    ) {}
    @Input()
    set appRolesModulos(val: string){
      console.log('*****', val);
      this.permisos = val;
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.updateView();
    }
    private updateView(){
      this.viewContainerRef.clear();
      if(this.checkPermisos()){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
    private checkPermisos(){
        if(this.permisos == 'dashboard'){
            return true;
        }else{
            let json = new Array();
            for (let index = 0; index < this.toolsService.user_permisions.length; index++) {
                const element = this.toolsService.user_permisions[index];
                json.push(element.us_modulo);
            }
            console.log({json_: json});
            this.scopes = json;
            console.log({scopes_nodulos: this.scopes});
            console.log(this.scopes.includes(this.permisos));
            if(this.scopes.includes(this.permisos)){
                return true;
            }else{
                return false;
            }
        }
    }
}
