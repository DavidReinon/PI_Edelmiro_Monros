import { TestBed } from '@angular/core/testing';

import { ProductosStateService } from './productos-state.service';

describe('ProductosStateService', () => {
  let service: ProductosStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
