import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IDrHarvesterInput } from '../model/dr-harvester/dr-harvester-input.model';
import {
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from '../model/dr-harvester/dr-harvester-output.model';
import { ArrowheadService } from './arrowhead.service';

@Injectable({
  providedIn: 'root',
})
export class DrHarvesterService {
  private _drHarvesterUrl: string = '';
  constructor(private http: HttpClient, private _arrowhead: ArrowheadService) {
    this._arrowhead.getDrHarvester().subscribe((service) => {
      this._drHarvesterUrl = `${service.provider.address}:${service.provider.port}`;
    });
  }

  get drHarvesterUrl(): string {
    return this._drHarvesterUrl;
  }
  set drHarvesterUrl(url: string) {
    this._drHarvesterUrl = url;
  }
  startSimulation(input: IDrHarvesterInput): Observable<IDrHarvesterJob> {
    return this.http
      .post<IDrHarvesterJob>(
        `${this._drHarvesterUrl}/harvester/simulation`,
        input
      )
      .pipe(catchError(this.handleError));
  }

  getSimulation(simulationId: string): Observable<IDrHarvesterOutput> {
    return this.http
      .get<IDrHarvesterOutput>(
        `${this._drHarvesterUrl}/harvester/simulation/${simulationId}`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  //TODO: create service for error handling
  private handleError(error: HttpErrorResponse | any): Observable<never> {
    let msg = '';
    //* This means sintax error (aka wrng url or didn't find the URL)
    if (error.code == 12) {
      console.log(JSON.stringify(error));
      msg += `sintax error: bad URL - ${this._drHarvesterUrl}`;
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
      () => new Error(`Fetching data from DrHarvester - ${msg}`)
    );
  }

  public simulationControl = new Observable((observer) => {
    const checkSimulation = (func: any) =>
      this.getSimulation('').subscribe(func);

    const controLoop = (res: IDrHarvesterOutput) => {
      console.log('control loop');
      console.log(res);
      observer.next(res);
      if (res.terminated) return res.terminated;
      else {
        setTimeout(() => {
          checkSimulation(controLoop);
        }, 10000);
        return;
      }
    };
    checkSimulation(controLoop);
  });
}
