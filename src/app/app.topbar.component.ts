import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ToolsService } from './service/tools/tools.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];
    usuario: string;

    ngOnInit() {
        if(this.toolsService != undefined ){
            console.log({entroPermisos:this.toolsService});

            this.usuario = this.toolsService.user_perfil['us_nombre'];
        }
        this.items = [
            {label: 'Cerrar sesión', icon: 'pi pi-sign-out'}
        ];
    }

    constructor(
        public appMain: AppMainComponent,
        private router: Router,
        private toolsService:ToolsService,
    ) { }

    cerrarSession(){
        this.toolsService.user_perfil = null;
        this.toolsService.user_permisions = null;
        this.router.navigate(['']);
    }
}
