import { Component, Input, OnInit } from '@angular/core';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';

@Component({
  selector: 'app-show-thing',
  templateUrl: './show-thing.component.html',
  styleUrls: ['./show-thing.component.css'],
})
export class ShowThingComponent implements OnInit {
  @Input()
  things!: IDrHarvesterInput[];
  displayedColumns: string[] = ['icon', 'id', 'current', 'maxCurrent'];

  constructor() {}

  ngOnInit(): void {}
}
