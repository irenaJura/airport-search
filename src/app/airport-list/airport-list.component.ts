import { Component, OnInit } from '@angular/core';
import { Airport } from '../models/airport';
import { AirportService } from '../services/airport.service';
import { AuthService } from '../services/auth.service';

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

  constructor(private airportService: AirportService, private authService: AuthService) { }

  ngOnInit(): void {
    this.city ? this.searchCityAirports(this.city) : null;
  }

  searchCityAirports(city: string): void {
    if (this.city && this.authService.checkTokenValidity()) {
      setTimeout(() => {
        this.airportService.getAirports(city).subscribe({
          next: airports => this.airports = airports,
          error: err => this.errorMessage = err
        });
      }, 300)
    }
  }

}
