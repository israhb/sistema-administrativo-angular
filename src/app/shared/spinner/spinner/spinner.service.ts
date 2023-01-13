import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
    isLoading$ = new Subject<boolean>();
    show(){
        Promise.resolve().then(()=>  this.isLoading$.next(true));
    }
    hide(){
        Promise.resolve().then(()=>  this.isLoading$.next(false));
    }
}
