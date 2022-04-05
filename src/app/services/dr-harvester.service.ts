import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IDrHarvesterInput } from '../model/dr-harvester/dr-harvester-input.model';
import {
  DrHarvesterOutput,
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from '../model/dr-harvester/dr-harvester-output.model';

@Injectable({
  providedIn: 'root',
})
export class DrHarvesterService {
  private _simulationId: string | undefined;
  private _drHarvesterUrl: string = 'http://137.204.57.93:7739'; //'http://137.204.143.89:8888';
  constructor(private http: HttpClient) {}

  get drHarvesterUrl(): string {
    return this._drHarvesterUrl;
  }
  set drHarvesterUrl(url: string) {
    this._drHarvesterUrl = url;
  }
  startSimulation(input: IDrHarvesterInput): Observable<IDrHarvesterJob> {
    const reply = this.http
      .post<IDrHarvesterJob>(
        `${this._drHarvesterUrl}/harvester/simulation`,
        input
      )
      .pipe(catchError(this.handleError));
    reply.subscribe((job: IDrHarvesterJob) => {
      console.log(job);
      this._simulationId = job.jobId;
    });

    return reply;
  }

  getSimulation(): Observable<IDrHarvesterOutput> {
    return this.http
      .get<IDrHarvesterOutput>(
        `${this._drHarvesterUrl}/harvester/simulation/${this._simulationId}`
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
    else msg += `Error status code: ${error.status}, body: ${error.error}`;
    return throwError(
      () => new Error(`Error fetching data from DrHarvester - ${msg}`)
    );
  }

  public simulationControl = new Observable((observer) => {
    const checkSimulation = (func: any) => this.getSimulation().subscribe(func);

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
