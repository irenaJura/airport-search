import { TestBed } from '@angular/core/testing';

import { AirportService } from './airport.service';

describe('AirportServiceService', () => {
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
