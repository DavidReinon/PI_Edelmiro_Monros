import { TestBed } from '@angular/core/testing';

import { NoticiasStateService } from './noticias-state.service';

describe('NoticiasStateService', () => {
  let service: NoticiasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
