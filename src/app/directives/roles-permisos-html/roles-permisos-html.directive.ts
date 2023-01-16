import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ToolsService } from 'app/service/tools/tools.service';

@Directive({
  selector: '[appRolesPermisosHtml]'
})
export class RolesPermisosHtmlDirective {

    permisos: string;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private toolsService:ToolsService,
    ) { }
    @Input()
    set appRolesPermisosHtml(val: string){
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
        let json = new Array();
        for (let index = 0; index < this.toolsService.user_permisions.length; index++) {
            const element = this.toolsService.user_permisions[index];
            json.push(element.us_permisos);
        }
        let arrayPermisos = JSON.stringify(JSON.parse(json[0]));
        if(arrayPermisos.includes(this.permisos)){
            return true;
        }else{
            return false;
        }
    }
}
