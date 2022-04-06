import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IArrowheadAllReply } from '../model/arrowhead/arrowheadAllReply.model';
import { ArrowheadServiceRegistry } from '../model/arrowhead/arrowheadServiceRegistry.class';
import { IArrowheadServiceRegistry } from '../model/arrowhead/arrowheadServiceRegistry.model';

@Injectable({
  providedIn: 'root',
})
export class ArrowheadService {
  private static readonly _arrowheadUrl = `${environment.arrowhead.host}:${environment.arrowhead.port}`;
  constructor(private http: HttpClient) {}

  getAllServices(): Observable<IArrowheadAllReply> {
    return this.http
      .get<IArrowheadAllReply>(
        `${ArrowheadService._arrowheadUrl}/serviceregistry/query/all`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getService(serviceName: string): Observable<IArrowheadServiceRegistry> {
    return this.getAllServices().pipe(
      map(
        (res: IArrowheadAllReply) =>
          res.data.filter(
            (data: IArrowheadServiceRegistry) =>
              data.provider.systemName === serviceName
          )[0]
      )
    );
  }

  getDrHarvester(): Observable<ArrowheadServiceRegistry> {
    return this.getService(environment.arrowhead.harvester);
  }

  getNetworkWT(): Observable<ArrowheadServiceRegistry> {
    return this.getService(environment.arrowhead.networkWT);
  }

  private handleError(error: HttpErrorResponse | any): Observable<never> {
    let msg = '';
    //* This means sintax error (aka wrng url or didn't find the URL) (dont know the type)
    if (error.code == 12) {
      console.log(JSON.stringify(error));
      msg += `sintax error: bad URL - ${ArrowheadService._arrowheadUrl}`;
    } else if (error.status === 0) msg += `Client-side erro: ${error.error}`;
    else msg += `Error status code: ${error.status}, body: ${error.error}`;
    return throwError(
      () => new Error(`Error fetching data from Arrowhead - ${msg}`)
    );
  }
}
