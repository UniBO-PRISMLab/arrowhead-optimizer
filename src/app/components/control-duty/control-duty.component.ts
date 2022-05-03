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
  public initialDuty!: number;
  deviceParticularities: { [key: string]: any } = environment.paths;
  label: string = `Discharging Time`;
  icon = {
    code: 'arrow_upward',
    description: 'Battery Charging',
    color: '#69f0ae',
  };
  max: number = 100;
  min: number = 5;
  step: number = 5;
  lifetime$!: Observable<number>;
  showHarvester = false;
  harvester!: string;
  irradiance!: number;
  constructor(
    private _drHarvester: DrHarvesterService,
    private _thingService: ThingsService,
    private _batteryService: BatteryService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    // this.irradiance = this.thing.phIrr;
    this.duty = this.thing.duty;
    this.irradiance = this.thing.phIrr;
    this.initialDuty = this.duty;
    this.harvester = this.thing.harvId;
    if (this.thing.id && this.deviceParticularities[this.thing.id].duty) {
      let type = this.thing.id;
      this.max = this.deviceParticularities[type].duty.max;
      this.min = this.deviceParticularities[type].duty.min;
      this.step = this.deviceParticularities[type].duty.step;
    }
    this.lifetime$ = this.getBatteryLifetime(this.thing);
  }

  getBatteryLifetime(thing: IDrHarvesterInput) {
    return this._drHarvester.startSimulation(thing).pipe(
      mergeMap((job) => this._drHarvester.getSimulationUntilResult(job.jobId)),
      filter((simulation) => simulation.result != undefined),
      map((simulation) => {
        this.setLabel(simulation.result?.batlifeh);
        if (simulation.result?.batlifeh && simulation.result.batlifeh < 0)
          return simulation.result.tChargeh;

        return simulation.result?.batlifeh || 0;
      })
    );
  }

  formatBattery(lifetime: number) {
    return this._batteryService.formatBattery(lifetime);
  }

  setLabel(bat: number | undefined) {
    if (bat === undefined) return;

    if (bat >= 0) {
      this.icon = {
        code: 'arrow_downward',
        color: '#ffc800',
        description: 'Battery Discharging',
      };
      this.label = `Battery Discharging Time`;
    } else {
      this.icon = {
        code: 'arrow_upward',
        description: 'Battery Charging',
        color: '#69f0ae',
      };
      this.label = `Battery Charging Time`;
    }
  }
  setHarvester(harvester: string) {
    this.harvester = harvester;
    this.setLifetime(this.duty);
  }

  setLifetime(value: number | null, irradiance?: number) {
    if (irradiance != undefined) this.irradiance = irradiance;
    if (value === null) return;
    this.duty = value;
    let thing = { ...this.thing };
    thing.duty = value;
    thing.phIrr = this.irradiance;
    thing.harvId = this.harvester;
    console.log(this.harvester);
    this.lifetime$ = this.getBatteryLifetime(thing);
  }

  toggleHarvester(show: boolean) {
    this.setLifetime(this.duty, this.thing.phIrr)
    this.showHarvester = show;
  }


  isButtonDisabled() {
    return this.duty == this.initialDuty || this.showHarvester;
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
