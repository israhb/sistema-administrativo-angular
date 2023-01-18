import { Usuarios } from 'app/api/Usuarios';
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
   /****************BOTONES********************* */
   submitted: boolean; //submit para agregar info
   banAddUpdate: boolean;
   itemsMenuOptions: MenuItem[]; //opciones de la toolbar
    /************ DIALOGS *************************/
    dialogAdd: boolean;
    deleteDialog: boolean;
    /************ FORMULARIO ************************ */
    form_model_nombre: string;
    form_model_telefono: string;
    form_model_correo: string;
    form_model_nombre_contacto: string;
    form_model_logo: string;
    form_model_color_primario: string;
    form_model_color_secundario: string;
    form_model_color_auxiliar: string;

    constructor(
        private messageService: MessageService,
        private toolsService:ToolsService,
        private apisGeneralesService:ApisGeneralesService,
        private rolesPermisosDirective:RolesPermisosDirective,
    ) { }

    ngOnInit(): void {
        let btnAdd = this.rolesPermisosDirective.checkPermisos?.('add') ?
            {

                label: '',
                icon: 'pi pi-plus',
                title: 'Agregar',
                styleClass: 'successButton',
                command: () => {
                    this.openAddUpdateDialog(false, {}, false);
                }
            } : {};
        this.itemsMenuOptions = [
            btnAdd,
        ];
        this.refreshTable();
    }
    refreshTable(){
        let json = {
          auth_token: this.toolsService.user_perfil['us_token']
        };
        this.apisGeneralesService.postListarClientes(JSON.parse(JSON.stringify(json))).subscribe((r) => this.usuarios = this.toolsService.getGenerateNumeracionTables(r));
    }
    openAddUpdateDialog(ban: boolean, usuario: Clientes, banderaEliminar: boolean) {
        if(banderaEliminar){
          this.usuario = {...usuario};
          this.deleteDialog = true;
        }else{
          if(ban){//actualizar
            this.banAddUpdate = true;
            this.usuario = {...usuario};
            this.form_model_nombre = this.usuario.cl_nombre;
            this.form_model_telefono = this.usuario.cl_telefono;
            this.form_model_correo = this.usuario.cl_correo;
            this.form_model_nombre_contacto = this.usuario.cl_nombre_contacto;
          }else{//agregar
            this.usuario = {};
            this.banAddUpdate = false;
            this.form_model_nombre = null;
            this.form_model_telefono = null;
            this.form_model_correo = null;
            this.form_model_nombre_contacto = null;
            this.form_model_logo = null;
            this.form_model_color_primario = null;
            this.form_model_color_secundario = null;
            this.form_model_color_auxiliar = null;
          }
          this.submitted = false;
          this.dialogAdd = true;
        }
    }
    saveUser(banEliminar: boolean){
        if(banEliminar){//eliminar
            console.log('Eliminar');
            /*this.deleteDialog = false;
            let json = {
             op_id: this.usuario.op_id,
             auth_token: this.toolsService.user_perfil['us_token']
            };
            this.apisGeneralesService.postEliminaOperador(JSON.parse(JSON.stringify(json))).subscribe({
            next: (r) =>{
                if(r != null ){
                 if(r['success']){
                     this.clean();
                     this.refreshTable();
                     this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Usuario Eliminado Correctamente', life: 3000});
                 }else{
                     this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al Eliminar Usuario', life: 3000});
                 }
                }
            },
            error: (e) =>{
                console.error(e);
            },
            complete: () => console.info('complete')
            });*/
        }else{
            this.submitted = true;
            if(this.form_model_nombre != null && this.form_model_nombre != undefined ){
                if(this.banAddUpdate){//actualizar
                    this.dialogAdd = false;
                    this.clean();
                    // let json = {
                    //     cl_id: this.usuario.cl_id,
                    //     cl_nombre: this.form_model_nombre,
                    //     cl_telefono: this.form_model_telefono,
                    //     cl_correo: this.form_model_correo,
                    //     cl_nombre_contacto: this.form_model_nombre_contacto,
                    //      auth_token: this.toolsService.user_perfil['us_token']
                    // };
                    // console.log(json);
                    // this.apisGeneralesService.postUpdateCliente(JSON.parse(JSON.stringify(json))).subscribe({
                    //     next: (r) =>{
                    //         if(r != null ){
                    //             if(r['success']){
                    //                 this.clean();
                    //                 this.refreshTable();
                    //                 this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Cliente Actualizado Correctamente', life: 3000});
                    //             }else{
                    //                 this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al Actualizar Cliente', life: 3000});
                    //             }
                    //         }
                    //     },
                    //     error: (e) =>{
                    //         console.error(e);
                    //     },
                    //     complete: () => console.info('complete')
                    // });
                }else{//agregar
                    this.dialogAdd = false;
                    let json = {
                        cl_nombre: this.form_model_nombre,
                        cl_telefono: this.form_model_telefono,
                        cl_correo: this.form_model_correo,
                        cl_nombre_contacto: this.form_model_nombre_contacto,
                        cl_configuracion: {
                                co_logo: this.form_model_logo,
                                co_color_primario: this.form_model_color_primario,
                                co_color_secundario: this.form_model_color_secundario,
                                co_color_auxiliar: this.form_model_color_auxiliar
                        },
                         auth_token: this.toolsService.user_perfil['us_token']
                    };
                    console.log(json);
                    this.apisGeneralesService.postRegistrarCliente(JSON.parse(JSON.stringify(json))).subscribe({
                    next: (r) =>{
                        if(r != null ){
                            if(r['success']){
                                this.clean();
                                this.refreshTable();
                                this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Cliente Creado Correctamente', life: 3000});
                            }else{
                                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al Registrar Cliente', life: 3000});
                            }
                        }
                        },
                        error: (e) =>{
                            console.error(e);
                        },
                        complete: () => console.info('complete')
                    });
                }
            }else{
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Faltan Campos por llenar!', life: 3000});
            }
        }
    }
    clean(){
        this.usuario = {};
        this.dialogAdd = false;
        this.submitted = false;
        this.banAddUpdate = false;
        this.deleteDialog = false;
        this.form_model_nombre = null;
        this.form_model_telefono = null;
        this.form_model_correo = null;
        this.form_model_nombre_contacto = null;
        this.form_model_logo = null;
        this.form_model_color_primario = null;
        this.form_model_color_secundario = null;
        this.form_model_color_auxiliar = null;
     }

}
