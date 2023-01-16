import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { Operador } from 'app/api/Operador';
import { ToolsService } from 'app/service/tools/tools.service';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { Campania } from 'app/api/Campania';
import { RolesPermisosDirective } from 'app/directives/roles-permisos/roles-permisos.directive';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  providers: [MessageService, RolesPermisosDirective],

  styleUrls: ['./operadores.component.scss',
  '../../../assets/sass/layout/_buttons.scss']
})
export class OperadoresComponent implements OnInit {

   /********* TABLA ********************** */
   usuario: Operador;
   usuarios: Operador[];
   /****************BOTONES********************* */
   submitted: boolean; //submit para agregar info
   banAddUpdate: boolean;
   itemsMenuOptions: MenuItem[]; //opciones de la toolbar

   /************ DIALOGS *************************/
   dialogAdd: boolean;
   deleteDialog: boolean;
   /************ FORMULARIO ************************ */
   form_model_nombre: string;
   form_model_usuario: string;
   form_model_password: string;
   form_model_telefono: string;
   form_model_correo: string;
   form_model_campania: number; form_model_options_campania: Campania;

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
                    this.openAddUpdateDialog(false, {}, false);
                }
            } : {},
       ];
       this.getCampanias();
       this.refreshTable();
   }
   refreshTable(){
       let json = {
         auth_token: this.toolsService.user_perfil['us_token']
       };
       this.apisGeneralesService.postListarOperadores(JSON.parse(JSON.stringify(json))).subscribe((r) => this.usuarios = this.toolsService.getGenerateNumeracionTables(r['data']));
   }
   getCampanias(){
    let json = {
        id_cliente: this.toolsService.user_perfil['us_id'],
        auth_token: this.toolsService.user_perfil['us_token']
      };
      this.apisGeneralesService.postListarCampanias(JSON.parse(JSON.stringify(json))).subscribe((r) => this.form_model_options_campania = r );
   }
   openAddUpdateDialog(ban: boolean, usuario: Operador, banderaEliminar: boolean) {
       if(banderaEliminar){
         this.usuario = {...usuario};
         this.deleteDialog = true;
       }else{
         if(ban){//actualizar
           this.banAddUpdate = true;
           this.usuario = {...usuario};
           this.form_model_nombre = this.usuario.op_nombre;
           this.form_model_usuario = this.usuario.op_usuario;
           this.form_model_password = this.usuario.op_password;
           this.form_model_telefono = this.usuario.op_telefono;
           this.form_model_correo = this.usuario.op_correo == null || this.usuario.op_correo == 'NULL'  ? '' : this.usuario.op_correo;
           this.form_model_campania = this.usuario.op_campania_id;
         }else{//agregar
           this.usuario = {};
           this.banAddUpdate = false;
           this.form_model_nombre = null;
           this.form_model_usuario = null;
           this.form_model_password = null;
           this.form_model_telefono = null;
           this.form_model_correo = null;
           this.form_model_campania = null;
         }
         if(this.form_model_options_campania == null || this.form_model_options_campania == undefined ){
            this.getCampanias();
          }
         this.submitted = false;
         this.dialogAdd = true;
       }
   }
   saveUser(banEliminar: boolean){
       if(banEliminar){//eliminar
           this.deleteDialog = false;
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
           });
       }else{
           this.submitted = true;

           if(this.validacionAddUpdate() ){
               if(this.banAddUpdate){//actualizar
                   this.dialogAdd = false;
                   let json = {
                        op_id: this.usuario.op_id,
                        op_nombre: this.form_model_nombre,
                        op_usuario: this.form_model_usuario,
                        op_telefono: this.form_model_telefono,
                        op_correo: this.form_model_correo,
                        op_campania_id: this.form_model_campania,
                        auth_token: this.toolsService.user_perfil['us_token']
                   };
                   console.log(json);
                   this.apisGeneralesService.postActualizarOperador(JSON.parse(JSON.stringify(json))).subscribe({
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
                        op_nombre: this.form_model_nombre,
                        op_usuario: this.form_model_usuario,
                        op_password: this.form_model_password,
                        op_telefono: this.form_model_telefono,
                        op_correo: this.form_model_correo,
                        auth_token: this.toolsService.user_perfil['us_token']
                   };
                   console.log(json);
                   this.apisGeneralesService.postRegistrarOperador(JSON.parse(JSON.stringify(json))).subscribe({
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
           if((this.form_model_nombre != undefined && this.form_model_nombre !=null) && ( this.form_model_campania != null && this.form_model_campania != undefined )
               && (this.form_model_usuario != undefined && this.form_model_usuario !=null) && (this.form_model_telefono != undefined && this.form_model_telefono !=null)){
               return true;
           }else{
               return false;
           }
       }else{//agregar
           if((this.form_model_nombre != undefined && this.form_model_nombre !=null)
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
       this.form_model_usuario = null;
       this.form_model_password = null;
       this.form_model_telefono = null;
       this.form_model_correo = null;
       this.form_model_campania = null;
   }
}
