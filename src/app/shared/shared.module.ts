import { NgModule } from "@angular/core";

// dependencies
import * as prime from '@shared/dependencies/prime';
import * as angular from '@shared/dependencies/angular';


@NgModule({
  declarations: [
  ],
  imports: [
    ...angular.modules,
    ...prime.modules,
  ],
  exports: [
    ...prime.modules,
  ],
})
export class SharedModule { }
