import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu" *ngFor="let child of item.items" >
                        <li app-menuitem *appRolesModulos="child.rol" [item]="child" [index]="i"  role="none"></li>
                    </ul>
                </li>
                <p-divider></p-divider>
                <p class="font-bold"><small class="version-color">SA Ver. 1.0.0</small></p>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Panel principal',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/home'], rol: 'dashboard' }
                ]
            },
            {
                label: 'Administración',
                items: [
                    {label: 'Usuarios', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/usuarios'], rol: 'llamadas'},
                    {label: 'Llamadas', icon: 'pi pi-fw pi-phone', routerLink: ['/home/llamadas'], rol: 'llamadas'},
                    {label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/home/clientes'], rol: 'llamadas'},
                    {label: 'Operadores', icon: 'pi pi-fw pi-user', routerLink: ['/home/operadores'], rol: 'operador'},
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
