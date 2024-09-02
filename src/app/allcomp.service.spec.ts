import { TestBed } from '@angular/core/testing';

import { AllcompService } from './allcomp.service';

describe('AllcompService', () => {
  let service: AllcompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllcompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
