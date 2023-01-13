import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Airport } from './airport';
import { ApiResponse } from './apiresponse';

let headers = new HttpHeaders({
  'Authorization': 'Bearer 3ilOYWCjScDKrzeRqHIldAqqAI7o'
});

@Injectable({
  providedIn: 'root'
})

export class AirportService {
  private baseUrl = 'https://test.api.amadeus.com/v1';

  constructor(private http: HttpClient) { }

  getAirports(city: string): Observable<Airport[]> {
    return this.http.get<ApiResponse>(this.baseUrl + '/reference-data/locations?subType=AIRPORT&keyword=' + city, { headers })
      .pipe(
        delay(300),
        map(response => response.meta.count > 5 ? response.data.slice(0, 5) : response.data),
        tap(data => console.log(JSON.stringify(data))),
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
