import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@components/login/login.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: LoginComponent},
            {
                path: 'home', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent,
                        data: {
                            page: 'Panel Principal'
                        }
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
