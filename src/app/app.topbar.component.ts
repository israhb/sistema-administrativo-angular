import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label: 'Cerrar sesión', icon: 'pi pi-sign-out'}
        ];
    }

    constructor(public appMain: AppMainComponent) { }
}
