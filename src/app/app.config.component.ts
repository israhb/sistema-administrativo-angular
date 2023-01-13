import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { ConfigService } from './service/app.config.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit {


    subscription: Subscription;

    constructor(public app: AppComponent, public appMain: AppMainComponent, public configService: ConfigService, public primengConfig: PrimeNGConfig) { }

    ngOnInit() {

    }

}