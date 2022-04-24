import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { IDrHarvesterJob } from 'src/app/model/dr-harvester/dr-harvester-output.model';
import { BatteryService } from 'src/app/services/battery.service';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';
import { ThingsService } from 'src/app/services/things.service';

@Component({
  selector: 'app-show-battery',
  templateUrl: './show-battery.component.html',
  styleUrls: ['./show-battery.component.css'],
})
export class ShowBatteryComponent implements OnInit {
  //TODO ajust to correct time frame
  charge: number = NaN;
  hours: number = NaN;
  batteryLifetime: number = NaN;
  isLoading = true;
  show = false;
  battery$!: Observable<BatteryType>;

  constructor(
    private _thingService: ThingsService,
    private _batteryService: BatteryService,
    private _drHarvester: DrHarvesterService
  ) {}

  setBatteryInfo() {
    this.isLoading = isNaN(this.hours);
    if (this.isLoading) this.batteryLifetime = this.hours * 3600;
  }
  thing$!: Observable<IDrHarvesterInput>;
  ngOnInit(): void {
    this.battery$ = this._thingService.getThings().pipe(
      tap((thing) => this.initSimulation(thing)),
      map((thing) => {
        const charge = this._batteryService.convertVToPercent(thing.batV);
        this.charge = charge;
        return this.caculateBattery(charge);
      })
    );
  }

  initSimulation(thing: IDrHarvesterInput) {
    let subscription = this._drHarvester
      .startSimulation(thing)
      .subscribe((job) => {
        this.setSimulationResult(job);
        subscription.unsubscribe();
      });
  }

  setSimulationResult(job: IDrHarvesterJob) {
    let subscription = this._drHarvester
      .getSimulationUntilResult(job.jobId)
      .subscribe((simulation): void => {
        if (simulation.result?.batlifeh)
          this.batteryLifetime = simulation.result?.batlifeh;

        this.isLoading = false;
        subscription.unsubscribe();
      });
  }

  caculateBattery(charge: number): BatteryType {
    if (charge < 0 || charge > 1 || isNaN(charge))
      return {
        charge: BatteryCharge.CHARGE_UNKNOWN,
        color: 'rgb(102 220 255)',
      };
    else
      return this.chargesStates[Math.round(charge * this.chargesStates.length)];
  }
  private readonly chargesStates: BatteryType[] = [
    { charge: BatteryCharge.CHARGE_0, color: 'red' },
    { charge: BatteryCharge.CHARGE_1_7, color: 'red' },
    { charge: BatteryCharge.CHARGE_2_7, color: 'yellow' },
    { charge: BatteryCharge.CHARGE_3_7, color: 'yellow' },
    { charge: BatteryCharge.CHARGE_4_7, color: '#59eb57' },
    { charge: BatteryCharge.CHARGE_5_7, color: '#59eb57' },
    { charge: BatteryCharge.CHARGE_6_7, color: '#59eb57' },
    { charge: BatteryCharge.CHARGE_1, color: '#59eb57' },
  ];
}

enum BatteryCharge {
  CHARGE_1 = 'battery_full',
  CHARGE_6_7 = 'battery_6_bar',
  CHARGE_5_7 = 'battery_5_bar',
  CHARGE_4_7 = 'battery_4_bar',
  CHARGE_3_7 = 'battery_3_bar',
  CHARGE_2_7 = 'battery_2_bar',
  CHARGE_1_7 = 'battery_1_bar',
  CHARGE_0 = 'battery_0_bar',
  CHARGE_UNKNOWN = 'battery_unknown',
}

type BatteryType = {
  charge: BatteryCharge;
  color: 'red' | '#59eb57' | 'yellow' | 'rgb(102 220 255)';
};
