import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import {
  IDrHarvesterJob,
  IDrHarvesterOutput,
} from 'src/app/model/dr-harvester/dr-harvester-output.model';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-harvester',
  templateUrl: 'test-harvester.component.html',
  styleUrls: ['./test-harvester.component.css'],
})
export class TestHarvesterComponent implements OnInit {
  public simulations: ISimulation[] = [];
  public drHarvesterInput: DrHarvesterInput = new DrHarvesterInput();
  public poolingTime: number = environment.poolingTime;
  @Output() error = new EventEmitter<Error>();
  @Output('simulation') result = new EventEmitter<IDrHarvesterOutput>();
  simulationError: boolean[] = [false];

  constructor(private _drHarvesterService: DrHarvesterService) {}

  public startSimulation() {
    this.simulations.push({
      job$: this._drHarvesterService.startSimulation(new DrHarvesterInput()),
      input: new DrHarvesterInput(),
    });
  }

  public restartSimulation(index: number = 0) {
    this.simulations[index] = {
      job$: this._drHarvesterService.startSimulation(new DrHarvesterInput()),
      input: new DrHarvesterInput(),
    };
  }
  ngOnInit(): void {}

  handleError(error: Error, index: number = 0): void {
    this.simulationError[index] = true;
    this.error.emit(error);
  }
  getSimulationResult(index: number, data?: IDrHarvesterJob) {
    if (this.simulationError[index]) this.simulationError[index] = false;
    if (data) {
      console.log(data);
      this.simulations[index].jobId = data.jobId;
    }
    if (this.simulations[index].jobId)
      this.simulations[index].output$ = this._drHarvesterService.getSimulation(
        this.simulations[index].jobId || ''
      );
  }
  setSimulationResult(result: IDrHarvesterOutput, index: number) {
    if (!result.terminated) {
      console.log(
        `simulation ${index} not finished, waiting ${this.poolingTime} and asking again`
      );
      this.simulations[index].output$ = undefined;
    } else {
      this.result.emit(result);
      console.log('simulation finished');
    }
  }

  callAgain(index: number = 0) {
    this.getSimulationResult(index);
  }
}

export interface ISimulation {
  output$?: Observable<IDrHarvesterOutput>;
  job$: Observable<IDrHarvesterJob>;
  jobId?: string;
  results?: IDrHarvesterOutput;
  input: DrHarvesterInput;
}
