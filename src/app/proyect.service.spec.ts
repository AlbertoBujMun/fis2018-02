import { TestBed } from '@angular/core/testing';

import { ProyectService } from './proyect.service';

describe('ProyectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProyectService = TestBed.get(ProyectService);
    expect(service).toBeTruthy();
  });
});
