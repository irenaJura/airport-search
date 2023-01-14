import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Airport } from './airport';
import { ApiResponse } from './apiresponse';

let headers = new HttpHeaders({
  'Authorization': 'Bearer 3NbcOxTj3CPoGxqnx9nTU7q8KHA5'
});

@Injectable({
  providedIn: 'root'
})

export class AirportService {
  private baseUrl = 'https://test.api.amadeus.com/v1';
  private airports: Airport[] = [];
  private airport: Airport | undefined;
  public cityFilter = '';

  constructor(private http: HttpClient) { }

  getAirports(city: string): Observable<Airport[]> {
    // return this.http.get<ApiResponse>(this.baseUrl + '/reference-data/locations?subType=AIRPORT&keyword=' + city, { headers: headers })
    //   .pipe(
    //     delay(300),
    //     map(response => response.meta.count > 5 ? response.data.slice(0, 5) : response.data),
    //     tap(data => this.airports = data),
    //     catchError(this.handleError)
    //   );

    // if (this.airports.length) return of(this.airports);
    this.airports = [
      { name: 'test', id: '1', iataCode: 'test' },
      { name: 'blabla', id: '2', iataCode: 'bla' }];
    // this.airports = [];
    return of(this.airports);

  }

  getAirport(id: number): Observable<Airport> | undefined {
    this.airport = this.airports.find(a => +a.id === id);
    return this.airport ? of(this.airport) : undefined;
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
