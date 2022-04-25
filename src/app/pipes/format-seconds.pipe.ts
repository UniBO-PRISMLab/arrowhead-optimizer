import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSeconds',
})
export class FormatSecondsPipe implements PipeTransform {
  private format(number: number): string {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  transform(seconds: number | string, ...args: unknown[]): string {
    if(typeof seconds !== 'number') return seconds;
    let hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minute = Math.floor(seconds / 60);
    seconds %= 60;
    return `${this.format(hour)}h ${this.format(minute)}min ${this.format(
      seconds
    )}s`;
  }
}
