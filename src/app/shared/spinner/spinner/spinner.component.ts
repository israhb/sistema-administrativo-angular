import { SpinnerService } from './spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="isLoading$ | async" class="overlaySpriner">
      <div class="centerSpiner">
          <p-progressSpinner animationDuration=".9s"></p-progressSpinner>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$  = this.spinnerService.isLoading$;
  constructor(
    private readonly spinnerService:SpinnerService
  ) {}
}
