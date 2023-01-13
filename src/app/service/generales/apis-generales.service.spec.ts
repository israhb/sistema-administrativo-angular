import { TestBed } from '@angular/core/testing';

import { ApisGeneralesService } from './apis-generales.service';

describe('ApisGeneralesService', () => {
  let service: ApisGeneralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisGeneralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
