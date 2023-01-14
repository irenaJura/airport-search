import { Component, OnInit } from '@angular/core';
import { Airport } from '../airport';
import { AirportService } from '../airport.service';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {
  pageTitle = 'Airport Search';
  airports: Airport[] = [];
  errorMessage = '';

  get city(): string {
    return this.airportService.cityFilter;
  }
  set city(value: string) {
    this.airportService.cityFilter = value;
    this.searchCityAirports(value);
  }

  constructor(private airportService: AirportService) { }

  ngOnInit(): void {
    this.city ? this.searchCityAirports(this.city) : null;
  }

  searchCityAirports(city: string): void {
    console.log('searching')

    if (this.city) {
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
