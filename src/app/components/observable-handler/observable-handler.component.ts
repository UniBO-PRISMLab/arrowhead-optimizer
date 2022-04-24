import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'observable-handlers',
  templateUrl: 'observable-handler.component.html',
})
export class ObservableHandlerComponent<T> implements OnInit {
  @Input() observable$: Observable<T>;
  @Input() show: boolean = true;
  @Output() error = new EventEmitter<Error>();
  @Output() data = new EventEmitter<T>();
  public observableError$: Observable<Error> | undefined;

  constructor() {
    this.observable$ = new Observable<T>();
  }

  ngOnInit(): void {
    //? Maybe pipe and map to clone the array?
    /*     this.observableError$ = this.observable$.pipe(
      ignoreElements(),
      catchError((err: Error): Observable<Error> => of(err))
    ); */
    this.observable$
      .pipe(
        catchError((err) => {
          this.error.emit(err);
          return throwError(() => new Error(err));
        })
      )
      .subscribe((data) => this.data.emit(data));
  }
}
