import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from '../services/local.service';
import { AirportService } from '../services/airport.service';
import { Airport } from '../models/airport';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-airport-detail',
  templateUrl: './airport-detail.component.html',
  styleUrls: ['./airport-detail.component.css']
})
export class AirportDetailComponent implements OnInit {
  errorMessage = '';
  airport?: Airport;

  constructor(
    private airportService: AirportService,
    private router: Router,
    private route: ActivatedRoute,
    private localService: LocalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.getAirport(id);
    });
  }

  getAirport(id: string) {
    const localStorageAirport = this.localService.getData('airport-' + id);
    if (localStorageAirport) {
      this.airport = JSON.parse(localStorageAirport);
    } else if (this.authService.checkTokenValidity()) {
      this.airportService.getAirport(id)?.subscribe({
        next: data => this.airport = data.data,
        error: err => this.errorMessage = err
      });
    }
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  onSave(id: string): void {
    this.localService.saveData('airport-' + id, JSON.stringify(this.airport));
  }

}
