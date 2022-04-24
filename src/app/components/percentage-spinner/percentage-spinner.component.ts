import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage-spinner',
  templateUrl: './percentage-spinner.component.html',
  styleUrls: ['./percentage-spinner.component.css'],
})
export class PercentageSpinnerComponent implements OnInit {
  @Input() value!: number;
  constructor() {}

  ngOnInit(): void {}
}
