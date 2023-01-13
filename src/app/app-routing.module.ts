import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@components/login/login.component';
import { UsuariosComponent } from '@components/usuarios/usuarios.component';
import { LlamadasComponent } from '@components/llamadas/llamadas.component';
import { OperadoresComponent } from '@components/operadores/operadores.component';
import { RolesModulosGuard } from './guards/roles-modulos.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: LoginComponent},
            {
                path: 'home', component: AppMainComponent,
                children: [
                    {
                        path: '', component: DashboardComponent,
                        data: {
                            page: 'Panel Principal'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                     //new moduls
                    {
                        path: 'usuarios',
                        component: UsuariosComponent,
                        data: {
                            section: 'Usuarios',
                            page: 'Listado de Usuarios'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'llamadas',
                        component: LlamadasComponent,
                        data: {
                            section: 'Llamadas',
                            page: 'Listado de Llamadas'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'operadores',
                        component: OperadoresComponent,
                        data: {
                            section: 'Operadores',
                            page: 'Listado de Operadores'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                ],
            },
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
