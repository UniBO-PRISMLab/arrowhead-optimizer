import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';

@Component({
  selector: 'app-test-thing',
  templateUrl: './test-things.component.html',
  styleUrls: ['./test-things.component.css'],
})
export class TestThingsComponent {
  @Input() thing!: IDrHarvesterInput;
  @Output() dutyChanged = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
  }
}
