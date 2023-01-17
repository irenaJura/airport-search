import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Airport } from '../models/airport';
import { AirportDetail } from '../models/airport-detail';
import { ApiResponse } from '../models/apiresponse';
import { AuthService } from './auth.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})

export class AirportService {
  private baseUrl = 'https://test.api.amadeus.com/v1';
  public cityFilter = '';

  constructor(private http: HttpClient, private authService: AuthService, private localService: LocalService) {
    if (!this.localService.getData('token')) this.authService.getAccessToken().subscribe();
  }

  getAirports(city: string): Observable<Airport[]> {
    return this.http.get<ApiResponse>(this.baseUrl + '/reference-data/locations?subType=AIRPORT&keyword=' + city, this.authService.requestOptions)
      .pipe(
        map(response => response.meta.count > 5 ? response.data.slice(0, 5) : response.data),
        catchError(this.handleError)
      );
  }

  getAirport(id: string): Observable<AirportDetail> | undefined {
    return this.http.get<AirportDetail>(this.baseUrl + '/reference-data/locations/' + id, this.authService.requestOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
