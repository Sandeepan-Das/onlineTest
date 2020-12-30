import { TestBed } from '@angular/core/testing';

import { OnlineTestService } from './online-test.service';

describe('OnlineTestService', () => {
  let service: OnlineTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
