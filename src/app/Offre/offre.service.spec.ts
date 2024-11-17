import { TestBed } from '@angular/core/testing';

import { OffreService } from './offre.service';

describe('AutreService', () => {
  let service: OffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
