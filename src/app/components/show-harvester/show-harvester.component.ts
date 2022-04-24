import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DrHarvesterSelector } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { ThingsService } from 'src/app/services/things.service';

@Component({
  selector: 'app-show-harvester',
  templateUrl: './show-harvester.component.html',
  styleUrls: ['./show-harvester.component.css'],
})
export class ShowHarvesterComponent implements OnInit {
  harvesterType$!: Observable<string>;
  constructor(private _thingService: ThingsService) {}

  ngOnInit(): void {
    this.harvesterType$ = this._thingService.getThingsAttribute(
      DrHarvesterSelector.harvId
    );
  }
  setHarvester(type: string = ''): string {
    switch (type) {
      case 'TEG':
        return 'eletrical_service';
      case 'piezo':
        return 'vibration';
      case 'SolarLightLoad':
        return 'solar_power';
      case 'SolarHeavyLoad':
        return 'solar_power';
      default:
        return 'question_mark';
    }
  }
  setIconClass(type: string = ''): string {
    if (type === 'SolarLightLoad') return 'material-icons-outlined';
    return 'material-icons';
  }
}
