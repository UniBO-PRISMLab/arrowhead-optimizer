import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { DrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import {
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from 'src/app/model/dr-harvester/dr-harvester-output.model';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-harvester',
  template: `
    <button (click)="startSimulation()">START SIMULATION</button>
    <div *ngFor="let simulation of simulations; index as i">
      <observable-handlers
        (data)="getSimulationResult(i, $event)"
        (error)="handleError($event)"
        [observable$]="simulation.job$"
      ></observable-handlers>
      <observable-handlers
        *ngIf="simulation.simulation$; else simulationRunning"
        [observable$]="simulation.simulation$"
        (data)="setSimulationResult($event, i)"
      ></observable-handlers>

      <ng-template #simulationRunning>
        <div *ngIf="simulation.jobId">
          Simulation is still running. Next call at
          <app-timer [time]="poolingTime" (finish)="callAgain(i)"></app-timer>
        </div>
      </ng-template>
    </div>
  `,
})
export class TestHarvesterComponent implements OnInit {
  public simulations: ISimulation[] = [];
  public drHarvesterInput: DrHarvesterInput = new DrHarvesterInput();
  public poolingTime: number = environment.poolingTime;
  constructor(private _drHarvesterService: DrHarvesterService) {}

  public startSimulation() {
    this.simulations.push({
      job$: this._drHarvesterService.startSimulation(new DrHarvesterInput()),
      input: new DrHarvesterInput(),
    });
  }
  ngOnInit(): void {}
  handleError(error: Error): void {
    console.log('>>>>>>>>>>ERRO<<<<<<<<<<<');
    console.log(error);
  }
  getSimulationResult(index: number, data?: IDrHarvesterJob) {
    if (data) this.simulations[index].jobId = data.jobId;

    this.simulations[index].simulation$ =
      this._drHarvesterService.getSimulation(
        this.simulations[index].jobId || ''
      );
  }
  setSimulationResult(result: IDrHarvesterOutput, index: number) {
    if (!result.terminated) {
      console.log(
        `simulation not finished, waiting ${this.poolingTime} and asking again`
      );
      this.simulations[index].simulation$ = undefined;
    } else {
      console.log('simulation finished');
    }
  }

  callAgain(index: number) {
    this.getSimulationResult(index);
  }
}

export interface ISimulation {
  simulation$?: Observable<IDrHarvesterOutput>;
  job$: Observable<IDrHarvesterJob>;
  jobId?: string;
  results?: IDrHarvesterOutput;
  input: DrHarvesterInput;
}
