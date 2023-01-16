import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Airport } from './airport';
import { AirportDetail } from './airport-detail';
import { ApiResponse } from './apiresponse';

let auth_token = "qvGMsZRXoHgYkQYDFoD4PT4Q7IEe";

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${auth_token}`
});

const requestOptions = { headers: headers };
@Injectable({
  providedIn: 'root'
})

export class AirportService {
  private baseUrl = 'https://test.api.amadeus.com/v1';
  private airports: Airport[] = [];
  public cityFilter = '';

  constructor(private http: HttpClient) { }

  getAirports(city: string): Observable<Airport[]> {
    // avoid API call when user goes back to list page
    if (this.airports.length) return of(this.airports);

    return this.http.get<ApiResponse>(this.baseUrl + '/reference-data/locations?subType=AIRPORT&keyword=' + city, requestOptions)
      .pipe(
        map(response => response.meta.count > 5 ? response.data.slice(0, 5) : response.data),
        tap(data => this.airports = data),
        catchError(this.handleError)
      );

  }

  getAirport(id: string): Observable<AirportDetail> | undefined {
    return this.http.get<AirportDetail>(this.baseUrl + '/reference-data/locations/' + id, requestOptions)
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
