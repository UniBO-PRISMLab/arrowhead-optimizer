import { Component, Input } from '@angular/core';
import {
  IDrHarvesterInput,
} from 'src/app/model/dr-harvester/dr-harvester-input.model';

@Component({
  selector: 'app-test-thing',
  templateUrl: './test-things.component.html',
  styleUrls: ['./test-things.component.css'],
})
export class TestThingsComponent {
  @Input() thing!: IDrHarvesterInput;
  constructor() {

  }

  ngOnInit(): void {
  }
}
