import { Component, Input, OnInit } from '@angular/core';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

@Component({
  selector: 'observable-handlers',
  templateUrl: 'observable-handler.component.html',
})
export class ObservableHandlerComponent<T> implements OnInit {
  @Input() observable$: Observable<T>;
  public observableError$: Observable<Error> | undefined;

  constructor() {
    this.observable$ = new Observable<T>();
  }

  ngOnInit(): void {
    //? Maybe pipe and map to clone the array?
    this.observableError$ = this.observable$.pipe(
      ignoreElements(),
      catchError((err: Error): Observable<Error> => of(err))
    );
  }
}
