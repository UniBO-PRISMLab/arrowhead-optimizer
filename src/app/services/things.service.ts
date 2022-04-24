import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, share, shareReplay } from 'rxjs';
import { ArrowheadService } from './arrowhead.service';
import { HttpHandler } from '../model/base-http.model';
import { IDrHarvesterInput } from '../model/dr-harvester/dr-harvester-input.model';
import { ThingCacheService } from './thing-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ThingsService extends HttpHandler {
  //TODO: created shared thing object
  //TODO: update shared thing object when duty gets updated
  cachedThing$: Observable<IDrHarvesterInput> | undefined;

  protected override _url: string = '';
  constructor(
    private http: HttpClient,
    private _arrowhead: ArrowheadService,
    private _thingCache: ThingCacheService
  ) {
    super();

    this._arrowhead
      .getNetworkWT()
      .subscribe(
        (service) =>
          (this._url = service
            ? `${service.provider.address}:${service.provider.port}`
            : '/assets/data/things.json')
      );
  }

  changeDutyCycle(duty: number) {
    return this.http
      .post(`${this._url}/dutyCycle`, { dutyCicle: duty })
      .pipe(retry(3), catchError(this.handleError));
  }


  getThings(url=this._url, path='things'): Observable<IDrHarvesterInput> {
    let thing$ = this._thingCache.getValue();
    if (!thing$) {
      thing$ = this.http
        //.get<IDrHarvesterInput>('/assets/data/things.json')
        .get<IDrHarvesterInput>(`${url}/${path}`)
        .pipe(retry(3), catchError(this.handleError), shareReplay(1));
      this._thingCache.setValue(thing$);
    }
    return thing$;
  }

  getThingsAttribute<T>(attr: string): Observable<T> {
    return this.getThings().pipe(map((things: any) => things[attr]));
  }
}
