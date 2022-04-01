import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ArrowheadServiceRegistry,
  IArrowheadServiceRegistry,
} from '../model/ah-service-registry.model';

@Injectable({
  providedIn: 'root',
})
export class ArrowheadService {
  private _arrowheadUrl: string;
  constructor(private http: HttpClient) {
    this._arrowheadUrl = `${environment.arrowhead.host}:${environment.arrowhead.port}`;
  }

  getAllServices(): Observable<IArrowheadServiceRegistry[]> {
    return this.http
      .get<IArrowheadServiceRegistry[]>(
        `${this._arrowheadUrl}/serviceregistry/query/all`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getServices(serviceName: string): Observable<ArrowheadServiceRegistry> {
    return new Observable<ArrowheadServiceRegistry>((observable) => {
      observable.next(new ArrowheadServiceRegistry());
    });
  }

  getDrHarvester(): Observable<ArrowheadServiceRegistry> {
    return new Observable<ArrowheadServiceRegistry>((observable) => {
      observable.next(new ArrowheadServiceRegistry());
    });
  }

  getNetworkWT(): Observable<ArrowheadServiceRegistry> {
    return new Observable<ArrowheadServiceRegistry>((observable) => {
      observable.next(new ArrowheadServiceRegistry());
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) console.error('Client-side erro:', error.error);
    else
      console.error(`Error status code: ${error.status}, body: ${error.error}`);
    return throwError(
      () =>
        new Error(
          `Error fetching data from Arrowhead - ${
            error.status === 0
              ? 'Internal error'
              : `Server error ${error.status} `
          }`
        )
    );
  }
}
