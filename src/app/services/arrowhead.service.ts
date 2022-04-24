import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IArrowheadAllReply } from '../model/arrowhead/arrowheadAllReply.model';
import { ArrowheadServiceRegistry } from '../model/arrowhead/arrowheadServiceRegistry.class';
import { IArrowheadServiceRegistry } from '../model/arrowhead/arrowheadServiceRegistry.model';
import { HttpHandler } from '../model/base-http.model';
import { ArrowheadCacheService } from './arrowhead-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ArrowheadService extends HttpHandler {
  constructor(
    private http: HttpClient,
    private _arrowheadCache: ArrowheadCacheService
  ) {
    super();
    this._url = `${environment.arrowhead.host}:${environment.arrowhead.port}`;
  }

  //TODO: cache this result
  getAllServices(): Observable<IArrowheadAllReply> {
    let arrowheadServices$ = this._arrowheadCache.getValue();
    if (!arrowheadServices$) {
      arrowheadServices$ = this.http
        .get<IArrowheadAllReply>(`${this._url}/serviceregistry/query/all`)
        .pipe(retry(3), catchError(super.handleError), shareReplay(1));
      this._arrowheadCache.setValue(arrowheadServices$);
    }
    return arrowheadServices$;
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
}
