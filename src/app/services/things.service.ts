import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  retry,
  shareReplay,
} from 'rxjs';
import { ArrowheadService } from './arrowhead.service';
import { HttpHandler } from '../model/base-http.model';
import { IDrHarvesterInput } from '../model/dr-harvester/dr-harvester-input.model';
import { ThingCacheService } from './thing-cache.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThingsService extends HttpHandler {
  //TODO: created shared thing object
  //TODO: update shared thing object when duty gets updated
  cachedThing$: Observable<IDrHarvesterInput> | undefined;
  services: { [key: string]: Observable<Service> } = {};
  serviceNames = environment.arrowhead.services;
  paths: { [key: string]: { havesterInput: string; changeDuty: string } } =
    environment.paths;
  protected override _url: string = '';
  constructor(
    private http: HttpClient,
    private _arrowhead: ArrowheadService,
    private _thingCache: ThingCacheService
  ) {
    super();
    for (const serviceName of this.serviceNames)
      this.services[serviceName] = this._arrowhead.getService(serviceName).pipe(
        map((service) => {
          const name = service.provider.systemName;
          return {
            id: name,
            url: `${service.provider.address}:${service.provider.port}`,
            path: this.paths[name],
          };
        })
      );
  }

  changeDutyCycle(duty: number, serviceName: string) {
    return this.services[serviceName].pipe(
      mergeMap((service) =>
        this.http.post(`${service.url}/${service.path.changeDuty}`, {
          duty_cycle: duty,
        })
      ),
      retry(3),
      catchError(this.handleError)
    );
  }

  getThings(serviceName: string, cache = true): Observable<IDrHarvesterInput> {
    let thing$;
    if (cache) thing$ = this._thingCache.getValue(serviceName);
    if (!thing$) {
      thing$ = this.services[serviceName].pipe(
        mergeMap((service) =>
          this.http.get<IDrHarvesterInput>(
            `${service.url}/${service.path.havesterInput}`
          )
        ),
        map((service) => {
          service.id = serviceName;
          return service;
        }),
        retry(3),
        catchError(this.handleError),
        shareReplay(1)
      );
      this._thingCache.setValue(thing$, serviceName);
    }
    return thing$;
  }

  getThingsAttribute<T>(attr: string, serviceName: string): Observable<T> {
    return this.getThings(serviceName).pipe(map((things: any) => things[attr]));
  }
}

export type Service = {
  id: string;
  url: string;
  path: {
    havesterInput: string;
    changeDuty: string;
  };
};
