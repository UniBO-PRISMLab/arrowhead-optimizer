import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import {
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from 'src/app/model/dr-harvester/dr-harvester-output.model';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';

@Component({
  selector: 'app-test-harvester',
  template: `
    <observable-handlers [observable$]="harvesterJob$"></observable-handlers>
  `,
  styleUrls: ['./test-harvester.component.css'],
})
export class TestHarvesterComponent implements OnInit {
  public simulation$: Observable<IDrHarvesterOutput> =
    new Observable<IDrHarvesterOutput>();
  public harvesterJob$: Observable<IDrHarvesterJob> =
    new Observable<IDrHarvesterJob>();

  constructor(private _drHarvesterService: DrHarvesterService) {}

  ngOnInit(): void {
    this.harvesterJob$ = this._drHarvesterService.startSimulation(
      new DrHarvesterInput()
    );
/*     this.simulation$ = this._drHarvesterService.getSimulation();
 */  }
}
