import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-duty-slider',
  templateUrl: './duty-slider.component.html',
  styleUrls: ['./duty-slider.component.css'],
})
export class DutySliderComponent {
  @Input() duty!: number;
  @Input() max: number = 100;
  @Input() min: number = 5;
  @Input() step: number = 5;
  @Output() changeDuty = new EventEmitter<number>();

  constructor() {}

  change(value: number | null): void {
    if (value === null) return;
    if (value != this.duty) {
      this.duty = value;
      this.changeDuty.emit(this.duty);
    }
  }
  formatLabel(value: number) {
    return value + '%';
  }
}
