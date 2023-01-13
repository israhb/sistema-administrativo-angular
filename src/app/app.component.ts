import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';

    constructor(private config: PrimeNGConfig, private translateService: TranslateService) {
            translateService.addLangs(['es', 'en']);
        }

    ngOnInit() {
        this.translateService.setDefaultLang('es');
        this.translate('es');
        this.config.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    }
}