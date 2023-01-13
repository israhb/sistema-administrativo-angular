import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-rutas-paginas',
  templateUrl: './rutas-paginas.component.html',
  styleUrls: ['./rutas-paginas.component.scss']
})
export class RutasPaginasComponent implements OnInit {

  
  public page?: string;
  public page2?: string;
  public section?: string;
  public titlesubs$: Subscription;
  public update$: Subscription;

  pageItems: MenuItem[];

  constructor(public router:Router) {
    this.titlesubs$ = this.getArguments().subscribe(({page, page2, section}) => {
      this.page = page;
      this.page2 = page2;
      this.section = section;
      document.title = `SIGMAA - ${page}`;
    });
    this.update$ = this.pushElements().subscribe(({}) => {

    }); 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titlesubs$.unsubscribe();
  }

  pushElements () {
    return this.router.events.pipe (
    )
  }
  getArguments () {
    return this.router.events.pipe (
      filter ((event:any) => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    )
  }

}
