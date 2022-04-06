import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable, take, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  template: '{{ time - clock  }}',
})
export class TimerComponent implements OnInit {
  @Output() finish = new EventEmitter();
  @Input()
  time!: number;
  clock: number = 0;

  ngOnInit(): void {
    interval(1000)
      .pipe(take(this.time))
      .subscribe((value) => {
        this.clock = 1 + value;
        if (this.clock >= this.time) this.finish.emit();
      });
  }
}
