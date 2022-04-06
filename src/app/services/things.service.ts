import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ArrowheadService } from './arrowhead.service';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  private _thingsUrl: string = '';
  constructor(private http: HttpClient, private _arrowhead: ArrowheadService) {
    this._arrowhead.getNetworkWT().subscribe((service) => {
      this._thingsUrl = `${service.provider.address}:${service.provider.port}`;
    });
  }

  changeDutyCicle(duty: number) {
    return this.http
      .post(`${this._thingsUrl}/dutyCicle`, { dutyCicle: duty })
      .pipe(catchError(this.handleError));
  }

  getThings(){
    return this.http
      .get(
        `${this._thingsUrl}/things`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  //TODO: create service for error handling
  private handleError(error: HttpErrorResponse | any): Observable<never> {
    let msg = '';
    //* This means sintax error (aka wrng url or didn't find the URL)
    if (error.code == 12) {
      console.log(JSON.stringify(error));
      msg += `sintax error: bad URL - ${this._thingsUrl}`;
    } else if (error.status === 0)
      msg += `Client-side erro: ${JSON.stringify(error, [
        'message',
        'arguments',
        'type',
        'name',
      ])}`;
    else
      msg += `Error status code: ${error.status}, body: ${JSON.stringify(
        error.error
      )}`;
    return throwError(
      () => new Error(`Fetching data from ThingsHub - ${msg}`)
    );
  }
}
