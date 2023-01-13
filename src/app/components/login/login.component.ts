import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { ToolsService } from 'app/service/tools/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    /******** variables********** */
    submitted: boolean;
    password: string;
    user: string;
    form_codigo: number;
    modelLogin: any;
    /******** modales ******** */
    dialogCodigo: boolean;

    constructor(
        private messageService: MessageService,
        private apisGeneralesService:ApisGeneralesService,
        private toolsService:ToolsService,
        private router: Router,
    ) { }
    getLogin(): void{
        this.submitted = true;
        if(this.user != undefined && this.user != null && this.password != undefined && this.password != null ){
          let json = {
            us_usuario:   this.user,
            us_password:  this.password
          };
          this.apisGeneralesService.loginCredentials(JSON.parse(JSON.stringify(json))).subscribe({
            next: (v) =>{
              if(v != null ){
                this.modelLogin = v;
                this.submitted = false;
              }
            },
            error: (e) =>{
              console.error(e);
            },
            complete: () => {
              if(this.modelLogin.success){
                this.dialogCodigo = true
              }else{
                this.messageService.add({severity: 'error', summary: 'Error', detail: this.modelLogin.data, life: 3000});
              }
            }
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ingresa tus Credenciales', life: 3000});
        }
    }
    sendCode(): void{
        this.router.navigate(['/home']);
    }
}
