import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { Usuarios } from 'app/api/Usuarios';
import { Niveles } from 'app/api/Niveles';
import { RolesPermisosDirective } from 'app/directives/roles-permisos/roles-permisos.directive';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [MessageService, RolesPermisosDirective],
  styleUrls: [
    './usuarios.component.scss',
    '../../../assets/sass/layout/_buttons.scss'
    ]
})
export class UsuariosComponent implements OnInit {
    /********* TABLA ********************** */
    usuario: Usuarios;
    usuarios: Usuarios[];
    /****************BOTONES********************* */
    submitted: boolean; //submit para agregar info
    banAddUpdate: boolean;
    itemsMenuOptions: MenuItem[]; //opciones de la toolbar

    /************ DIALOGS *************************/
    dialogAdd: boolean;
    deleteDialog: boolean;
    /************ FORMULARIO ************************ */
    form_model_nombre: string;
    form_model_nivel: number; form_model_options_nivel: Niveles;
    form_model_usuario: string;
    form_model_password: string;
    form_model_telefono: string;

    constructor(
        private messageService: MessageService,
        private toolsService:ToolsService,
        private apisGeneralesService:ApisGeneralesService,
        private rolesPermisosDirective:RolesPermisosDirective,
    ) { }

    ngOnInit(): void {
        let btnAdd =  this.rolesPermisosDirective.checkPermisos?.('add') ?
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
        this.getNivelesUSuario();
        this.refreshTable();
    }
    refreshTable(){
        let json = {
          auth_token: this.toolsService.user_perfil['us_token']
        };
        this.apisGeneralesService.postListarUsusarios(JSON.parse(JSON.stringify(json))).subscribe((r) => this.usuarios = this.toolsService.getGenerateNumeracionTables(r['data']));
    }
    openAddUpdateDialog(ban: boolean, usuario: Usuarios, banderaEliminar: boolean) {
        if(banderaEliminar){
          this.usuario = {...usuario};
          this.deleteDialog = true;
        }else{
          if(ban){//actualizar
            this.banAddUpdate = true;
            this.usuario = {...usuario};
            this.form_model_nombre = this.usuario.us_nombre;
            this.form_model_nivel = this.usuario.us_nivel;
            this.form_model_usuario = this.usuario.us_usuario;
            this.form_model_password = this.usuario.us_password;
            this.form_model_telefono = this.usuario.us_telefono;
          }else{//agregar
            this.usuario = {};
            this.banAddUpdate = false;
            this.form_model_nombre = null;
            this.form_model_nivel = null;
            this.form_model_usuario = null;
            this.form_model_password = null;
            this.form_model_telefono = null;
          }
          if(this.form_model_options_nivel == null || this.form_model_options_nivel == undefined ){
            this.getNivelesUSuario();
          }
          this.submitted = false;
          this.dialogAdd = true;
        }
    }
    getNivelesUSuario(){
        let json = {
            auth_token: this.toolsService.user_perfil['us_token']
        };
        this.apisGeneralesService.getNivelsUser(JSON.parse(JSON.stringify(json))).subscribe((r) => this.form_model_options_nivel = r['data']);
    }
    saveUser(banEliminar: boolean){
        if(banEliminar){//eliminar
            this.deleteDialog = false;
            let json = {
            us_id: this.usuario.us_id,
            auth_token: this.toolsService.user_perfil['us_token']
            };
            this.apisGeneralesService.postEliminaUsuario(JSON.parse(JSON.stringify(json))).subscribe({
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
            });
        }else{
            this.submitted = true;

            if(this.validacionAddUpdate() ){
                if(this.banAddUpdate){//actualizar
                    this.dialogAdd = false;
                    let json = {
                        us_id: this.usuario.us_id,
                        us_nombre: this.form_model_nombre,
                        us_nivel: this.form_model_nivel,
                        us_usuario: this.form_model_usuario,
                        //us_password: this.form_model_password,
                        us_telefono: this.form_model_telefono,
                        auth_token: this.toolsService.user_perfil['us_token']
                    };
                    this.apisGeneralesService.postActualizarUsario(JSON.parse(JSON.stringify(json))).subscribe({
                        next: (r) =>{
                            if(r != null ){
                                if(r['success']){
                                    this.clean();
                                    this.refreshTable();
                                    this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Usuario Actualizado Correctamente', life: 3000});
                                }else{
                                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al Actualizar Usuario', life: 3000});
                                }
                            }
                        },
                        error: (e) =>{
                            console.error(e);
                        },
                        complete: () => console.info('complete')
                    });
                }else{//agregar
                    this.dialogAdd = false;
                    let json = {
                        us_nombre: this.form_model_nombre,
                        us_nivel: this.form_model_nivel,
                        us_usuario: this.form_model_usuario,
                        us_password: this.form_model_password,
                        us_telefono: this.form_model_telefono,
                        auth_token: this.toolsService.user_perfil['us_token']
                    };
                    this.apisGeneralesService.postRegistrarUsuario(JSON.parse(JSON.stringify(json))).subscribe({
                    next: (r) =>{
                        if(r != null ){
                            if(r['success']){
                                this.clean();
                                this.refreshTable();
                                this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Usuario Creado Correctamente', life: 3000});
                            }else{
                                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al Registrar Usuario', life: 3000});
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
    validacionAddUpdate(): boolean{
        if(this.banAddUpdate){//modificar
            if((this.form_model_nombre != undefined && this.form_model_nombre !=null) && (this.form_model_nivel != undefined && this.form_model_nivel !=null)
                && (this.form_model_usuario != undefined && this.form_model_usuario !=null) && (this.form_model_telefono != undefined && this.form_model_telefono !=null)){
                return true;
            }else{
                return false;
            }
        }else{//agregar
            if((this.form_model_nombre != undefined && this.form_model_nombre !=null) && (this.form_model_nivel != undefined && this.form_model_nivel !=null)
            && (this.form_model_usuario != undefined && this.form_model_usuario !=null)  && (this.form_model_password != undefined && this.form_model_password !=null)
            && (this.form_model_telefono != undefined && this.form_model_telefono !=null)){
                return true;
            }else{
                return false;
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
        this.form_model_nivel = null;
        this.form_model_usuario = null;
        this.form_model_password = null;
        this.form_model_telefono = null;
    }
}
