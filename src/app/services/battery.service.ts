import { Injectable } from '@angular/core';
import { ThingsService } from './things.service';

@Injectable({
  providedIn: 'root',
})
export class BatteryService {
  conversion: { [key: string]: number } = {
    '0': 0,
    '2.2': 0.02,
    '2.55': 0.05,
    '2.78': 0.1,
    '2.85': 0.15,
    '2.92': 0.2,
    '3.06': 0.4,
    '3.15': 0.4,
    '3.28': 0.5,
    '3.5': 0.7,
    '3.62': 0.8,
    '3.75': 0.85,
    '4.1': 1,
  };

  tensionValues: number[] = [];

  constructor(private _thingService: ThingsService) {
    for (let key in this.conversion)
      this.tensionValues.push(key as unknown as number);
  }

  getBattery() {}

  convertVToPercent(batteryVload: number): any {
    const tension = this.tensionValues.reduce((a, b) => {
      return Math.abs(b - batteryVload) < Math.abs(a - batteryVload) ? b : a;
    });
    return this.conversion[tension];
  }
}
