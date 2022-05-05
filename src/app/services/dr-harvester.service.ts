import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  mergeMap,
  Observable,
  repeat,
  retry,
  take,
  tap,
} from 'rxjs';
import {
  DrHarvesterInput,
  IDrHarvesterInput,
} from '../model/dr-harvester/dr-harvester-input.model';
import {
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from '../model/dr-harvester/dr-harvester-output.model';
import { ArrowheadService } from './arrowhead.service';
import { HttpHandler } from '../model/base-http.model';
import { ArrowheadServiceRegistry } from '../model/arrowhead/arrowheadServiceRegistry.class';
import { environment } from 'src/environments/environment';
import { DrHarvesterCacheService } from './dr-harvester-cache.service';

@Injectable({
  providedIn: 'root',
})
export class DrHarvesterService extends HttpHandler {
  harvesterService$: Observable<ArrowheadServiceRegistry>;
  constructor(
    private http: HttpClient,
    private _arrowhead: ArrowheadService,
    private _drHarvesterCache: DrHarvesterCacheService
  ) {
    super();
    this.harvesterService$ = this._arrowhead.getDrHarvester();
  }

  get drHarvesterUrl(): string {
    return this._url;
  }
  set drHarvesterUrl(url: string) {
    this._url = url;
  }
  startSimulation(input: IDrHarvesterInput): Observable<IDrHarvesterJob> {
    const simulationInput = new DrHarvesterInput(input);
    return this.harvesterService$.pipe(
      mergeMap((service) => {
        console.log(simulationInput);
        return this.http
          .post<IDrHarvesterJob>(
            `http://${service.provider.address}:${service.provider.port}/harvester/simulation`,
            simulationInput
          )
          .pipe(
            tap((data) => console.log(data)),
            retry(3),
            catchError(this.handleError)
          );
      })
    );
  }

  getSimulation(simulationId: string): Observable<IDrHarvesterOutput> {
    console.log(simulationId);
    let simulation$ = this._drHarvesterCache.getValue(simulationId);
    if (!simulation$) {
      simulation$ = this.harvesterService$.pipe(
        mergeMap((service) =>
          this.http
            .get<IDrHarvesterOutput>(
              `http://${service.provider.address}:${service.provider.port}/harvester/simulation/${simulationId}`
            )
            .pipe(retry(3), catchError(this.handleError))
        )
      );
      this._drHarvesterCache.setValue(simulation$, simulationId);
    }
    return simulation$;
  }

  getSimulationUntilResult(
    simulationId: string
  ): Observable<IDrHarvesterOutput> {
    return this.getSimulation(simulationId).pipe(
      repeat({ delay: environment.poolingTime }),
      filter((data) => data.terminated),
      take(1)
    );
  }
}
