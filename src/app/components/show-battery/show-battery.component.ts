import { Component, Input, OnInit } from '@angular/core';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { IDrHarvesterJob } from 'src/app/model/dr-harvester/dr-harvester-output.model';
import { BatteryService } from 'src/app/services/battery.service';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';

@Component({
  selector: 'app-show-battery',
  templateUrl: './show-battery.component.html',
  styleUrls: ['./show-battery.component.css'],
})
export class ShowBatteryComponent implements OnInit {
  charge: number = NaN;
  batteryLifetime: number = NaN;
  batteryChargeTime: number = NaN;
  label: string = `Discharging Time`;
  icon = {
    code: 'arrow_upward',
    description: 'Battery Charging',
    color: '#69f0ae',
  };
  isLoading = true;
  battery!: BatteryType;

  @Input() thing!: IDrHarvesterInput;
  constructor(
    private _batteryService: BatteryService,
    private _drHarvester: DrHarvesterService
  ) {}
  ngOnInit(): void {
    this.initSimulation(this.thing);
    this.charge = this._batteryService.convertVToPercent(this.thing.batV);
    this.battery = this.caculateBattery(this.charge);
  }

  formatBattery(lifetime: number) {
    return this._batteryService.formatBattery(lifetime);
  }

  initSimulation(thing: IDrHarvesterInput) {
    let subscription = this._drHarvester
      .startSimulation(thing)
      .subscribe((job) => {
        this.setSimulationResult(job);
        subscription.unsubscribe();
      });
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

  setSimulationResult(job: IDrHarvesterJob) {
    let subscription = this._drHarvester
      .getSimulationUntilResult(job.jobId)
      .subscribe((simulation): void => {
        if (simulation.result?.batlifeh) {
          this.setLabel(simulation.result?.batlifeh);
          this.batteryLifetime = simulation.result?.batlifeh;
          this.batteryChargeTime = simulation.result?.tChargeh;
        }
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
