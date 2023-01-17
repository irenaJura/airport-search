import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; import { AccessToken } from './access-token';
import { LocalService } from './local.service';
import { api_info } from './secret/api-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_token = '';

  public requestOptions = {};

  constructor(private http: HttpClient, private localService: LocalService) { }

  setHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.requestOptions = { headers: headers };
  }

  checkTokenValidity(): boolean {
    const JSONToken = this.localService.getData('token');

    if (JSONToken) {
      const obj = JSON.parse(JSONToken)
      const tokenCreated = obj.timestamp;
      const now = new Date().getTime();

      // if 30 minutes passed, get new token
      if (now - tokenCreated > 1800000) {
        console.log('token expired');
        this.localService.removeData('token');
        this.getAccessToken().subscribe({
          next: () => {
            const object = { token: this.auth_token, timestamp: new Date().getTime() }
            this.localService.saveData('token', JSON.stringify(object));
            this.setHeaders();
            return true;
          }
        })
      }

      this.setHeaders();
      return true;
    } else {
      this.getAccessToken().subscribe({
        next: () => {
          const object = { token: this.auth_token, timestamp: new Date().getTime() }
          this.localService.saveData('token', JSON.stringify(object));
          this.setHeaders();
        }
      });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      });
      this.requestOptions = { headers: headers };
      return true;
    }
  }

  getAccessToken() {
    const url = `https://test.api.amadeus.com/v1/security/oauth2/token`;
    const headers = new HttpHeaders({
      'Content-Type': ' application/x-www-form-urlencoded',
    });
    const body = `grant_type=client_credentials&client_id=${api_info.client_id}&client_secret=${api_info.client_secret}`;

    return this.http.post<AccessToken>(url, body, { headers })
      .pipe(
        tap(data => this.auth_token = data.access_token),
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
