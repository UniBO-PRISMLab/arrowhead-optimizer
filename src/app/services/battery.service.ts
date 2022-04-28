import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    '3.97':0.9,
    '4.1': 1,
  };

  tensionValues: number[] = [];

  constructor() {
    for (let key in this.conversion)
      this.tensionValues.push(key as unknown as number);
  }

  formatBattery(hours: number, duty?: number): string | number {
    if (hours < 0) return 'Unknown';

    let batteryLifetime = Math.round(hours * 3600);
    if (environment.fakeLifetime)
      batteryLifetime = this.fakeLifetime(batteryLifetime, duty || 1);
    return batteryLifetime;
  }

  fakeLifetime(seconds: number, duty: number): number {
    return seconds * (0.1 + (1 - duty / 100));
  }


  getCloserBatV(batV: number): number {
    const tension = this.tensionValues.reduce((a, b) => {
      return Math.abs(b - batV) < Math.abs(a - batV) ? b : a;
    });
    return tension;
  }
  convertVToPercent(batteryVload: number): any {
    const tension = this.getCloserBatV(batteryVload);
    return this.conversion[tension];
  }
}
