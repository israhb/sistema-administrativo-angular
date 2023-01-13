import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolsService } from 'app/service/tools/tools.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesModulosGuard implements CanActivate {
    constructor(
        private toolsService:ToolsService,
        private router: Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
  }
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if(this.toolsService.user_permisions){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
