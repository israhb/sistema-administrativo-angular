import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasPaginasComponent } from './rutas-paginas.component';

describe('RutasPaginasComponent', () => {
  let component: RutasPaginasComponent;
  let fixture: ComponentFixture<RutasPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasPaginasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
