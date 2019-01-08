import { TestBed } from '@angular/core/testing';

import { ResearcherService } from './researcher.service';

describe('ResearcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResearcherService = TestBed.get(ResearcherService);
    expect(service).toBeTruthy();
  });
});
