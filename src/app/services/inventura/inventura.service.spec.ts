import { TestBed } from '@angular/core/testing';

import { InventuraService } from './inventura.service';

describe('InventuraService', () => {
  let service: InventuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
