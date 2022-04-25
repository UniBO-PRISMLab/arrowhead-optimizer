import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { ThingsService } from 'src/app/services/things.service';

@Component({
  selector: 'app-show-power',
  templateUrl: './show-power.component.html',
  styleUrls: ['./show-power.component.css'],
})
export class ShowPowerComponent implements OnInit {
 @Input() thing!:IDrHarvesterInput;

  constructor() {}

  ngOnInit(): void {
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
}
