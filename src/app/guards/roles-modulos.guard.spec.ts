import { TestBed } from '@angular/core/testing';

import { RolesModulosGuard } from './roles-modulos.guard';

describe('RolesModulosGuard', () => {
  let guard: RolesModulosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolesModulosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
