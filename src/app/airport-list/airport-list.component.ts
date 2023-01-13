import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from '../airport';
import { AirportService } from '../airport.service';
import { ApiResponse } from '../apiresponse';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {
  pageTitle = 'Airport Search';
  city = '';
  airports?: Airport[];
  errorMessage = '';

  constructor(private airportService: AirportService) { }

  ngOnInit(): void {
  }

  searchCityAirports(city: string): void {
    console.log('searching')
    if (city) {
      this.airportService.getAirports(city).subscribe({
        next: airports => {
          this.airports = airports;
          console.log(this.airports)
        },
        error: err => this.errorMessage = err
      });
    }
  }

}
