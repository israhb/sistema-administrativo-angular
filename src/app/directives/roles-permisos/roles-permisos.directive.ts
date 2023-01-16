import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ToolsService } from 'app/service/tools/tools.service';

@Directive({
  selector: '[appRolesPermisos]'
})
export class RolesPermisosDirective {
    permisos: string;

    constructor(
        private toolsService:ToolsService,
    ) { }
    checkPermisos(permiso: string){
        this.permisos = permiso;
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
