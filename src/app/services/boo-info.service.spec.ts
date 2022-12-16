import { TestBed } from '@angular/core/testing';

import { BooInfoService } from './boo-info.service';

describe('BooInfoService', () => {
  let service: BooInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
