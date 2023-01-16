import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RolesPermisosDirective } from 'app/directives/roles-permisos/roles-permisos.directive';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { ToolsService } from 'app/service/tools/tools.service';
import { Clientes } from 'app/api/Clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers: [MessageService, RolesPermisosDirective],
  styleUrls: ['./clientes.component.scss',
  '../../../assets/sass/layout/_buttons.scss']
})
export class ClientesComponent implements OnInit {

    /********* TABLA ********************** */
    usuario: Clientes;
    usuarios: Clientes[];
    itemsMenuOptions: MenuItem[]; //opciones de la toolbar

    constructor(
        private messageService: MessageService,
        private toolsService:ToolsService,
        private apisGeneralesService:ApisGeneralesService,
        private rolesPermisosDirective:RolesPermisosDirective,
    ) { }

    ngOnInit(): void {
        this.itemsMenuOptions = [
            this.rolesPermisosDirective.checkPermisos?.('add') ?
                {

                    label: '',
                    icon: 'pi pi-plus',
                    title: 'Agregar',
                    styleClass: 'successButton',
                    command: () => {
                        //this.openAddUpdateDialog(false, {}, false);
                    }
                } : {},
           ];
        this.refreshTable();
    }
    refreshTable(){
        let json = {
          auth_token: this.toolsService.user_perfil['us_token']
        };
        this.apisGeneralesService.postListarClientes(JSON.parse(JSON.stringify(json))).subscribe((r) => this.usuarios = this.toolsService.getGenerateNumeracionTables(r));
    }

}
