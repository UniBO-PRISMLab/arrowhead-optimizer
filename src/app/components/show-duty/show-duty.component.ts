import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-show-duty',
  templateUrl: './show-duty.component.html',
  styleUrls: ['./show-duty.component.css'],
})
export class ShowDutyComponent {
  @Input() duty!: number;
  constructor() {}

}
