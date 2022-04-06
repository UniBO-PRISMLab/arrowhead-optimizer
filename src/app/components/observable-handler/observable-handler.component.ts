import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

@Component({
  selector: 'observable-handlers',
  templateUrl: 'observable-handler.component.html',
})
export class ObservableHandlerComponent<T> implements OnInit {
  @Input() observable$: Observable<T>;
  @Output() error = new EventEmitter<Error>();
  @Output() data = new EventEmitter<T>();
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
    this.observableError$.subscribe((error) => this.error.emit(error));
    this.observable$.subscribe((data) => this.data.emit(data));
  }
}
