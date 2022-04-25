import { Component, Input } from '@angular/core';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';

@Component({
  selector: 'app-show-power',
  templateUrl: './show-power.component.html',
  styleUrls: ['./show-power.component.css'],
})
export class ShowPowerComponent {
  @Input() thing!: IDrHarvesterInput;

  constructor() {}

  showCurrentPower(thing: IDrHarvesterInput): string {
    let currentPower = this.calculatePower(thing);
    if (currentPower >= 1) return `${this.format(currentPower)} W`;
    else return `${this.format(currentPower * 1000)} mW`;
  }
  showMaxPower(thing: IDrHarvesterInput): string {
    let maxPower = (thing.activeI / 1000) * thing.Vload;
    if (maxPower >= 1) return `${this.format(maxPower)} W`;
    else return `${this.format(maxPower * 1000)} mW`;
  }

  calculatePowerUsage(thing: IDrHarvesterInput): number {
    return this.calculatePower(thing) / ((thing.activeI / 1000) * thing.Vload);
  }

  calculatePower(thing: IDrHarvesterInput): number {
    if (thing.devAvgI) return thing.devAvgI * thing.Vload;
    return (
      ((thing.activeI * (thing.duty / 100) +
        thing.lowpwrI * (1 - thing.duty / 100)) /
        1000) *
      thing.Vload
    );
  }
  private format(number: number): string {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    });
  }
}
