import { TestBed } from '@angular/core/testing';

import { LearningstyleService } from './learningstyle.service';

describe('LearningstyleService', () => {
  let service: LearningstyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningstyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
