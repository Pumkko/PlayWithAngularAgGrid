import { TestBed } from '@angular/core/testing';

import { TotalAlienService } from './total-alien.service';

describe('TotalAlienServiceService', () => {
  let service: TotalAlienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalAlienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
