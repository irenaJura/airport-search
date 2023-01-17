import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Airport } from '../airport';
import { AirportService } from '../airport.service';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';

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
      console.log('localstorage')
    } else if (this.authService.checkTokenValidity()) {
      this.airportService.getAirport(id)?.subscribe(
        data => {
          this.airport = data.data,
            console.log('api call')
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  onSave(id: string): void {
    this.localService.saveData('airport-' + id, JSON.stringify(this.airport));
  }

}
