import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { BatteryService } from 'src/app/services/battery.service';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';
import { ThingsService } from 'src/app/services/things.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-control-duty',
  templateUrl: './control-duty.component.html',
  styleUrls: ['./control-duty.component.css'],
})
export class ControlDutyComponent implements OnInit {
  @Input() thing!: IDrHarvesterInput;
  @Output() dutyChanged = new EventEmitter<string>();

  public duty!: number;
  public simulations$: Observable<number>[] = [];
  deviceParticularities: { [key: string]: any } = environment.paths;

  max: number = 100;
  min: number = 5;
  step: number = 5;

  constructor(
    private _drHarvester: DrHarvesterService,
    private _thingService: ThingsService,
    private _batteryService: BatteryService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.duty = this.thing.duty;

    if (this.thing.id) {
      let type = this.thing.id;
      this.max = this.deviceParticularities[type].duty.max;
      this.min = this.deviceParticularities[type].duty.min;
      this.step = this.deviceParticularities[type].duty.step;
    }
    for (let percent = this.min; percent <= this.max; percent += this.step)
      this.getSimulation(percent);
  }

  formatBattery(lifetime: number) {
    return this._batteryService.formatBattery(lifetime);
  }
  getSimulation(value: number) {
    let thing = { ...this.thing };
    thing.duty = value;
    this.simulations$[value] = this._drHarvester.startSimulation(thing).pipe(
      mergeMap((job) => this._drHarvester.getSimulationUntilResult(job.jobId)),
      filter((simulation) => simulation.result != undefined),
      map((simulation) => {
        console.log(simulation.result);
        return (simulation.result?.batlifeh || 0);
      })
    );
  }
  round(round: number): number {
    return Math.round(round);
  }

  setLifetime(value: number | null) {
    if (!value) return;
    this.duty = value;
  }

  changeDuty() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: { duty: this.duty, device: this.thing.devId },
    });
    //TODO:check connection of system name and devId
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._thingService
          .changeDutyCycle(this.duty, this.thing.id || '')
          .subscribe((response) => {
            this.dutyChanged.emit(this.thing.id);
          });
    });
  }
}
