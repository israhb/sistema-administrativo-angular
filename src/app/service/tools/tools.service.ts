import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

     constructor() { }
    //funcion para generar numeros consecutivos en una tabla
    getGenerateNumeracionTables(json: any) {
        let count = 1;
        let jsonFinal = new Array();
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            element['numeracion'] = count;
            jsonFinal.push(element);
            count++;
        }
        return jsonFinal;
    }
    user_perfil: any[];
    user_permisions: any[];
}
