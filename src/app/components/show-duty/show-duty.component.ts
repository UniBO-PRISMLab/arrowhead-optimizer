import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DrHarvesterSelector,
  IDrHarvesterInput,
} from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { ThingsService } from 'src/app/services/things.service';

@Component({
  selector: 'app-show-duty',
  templateUrl: './show-duty.component.html',
  styleUrls: ['./show-duty.component.css'],
})
export class ShowDutyComponent {
  duty$!: Observable<number>;
  //thing$!: Observable<IDrHarvesterInput>;
  constructor(private _thingService: ThingsService) {}

  ngOnInit(): void {
    this.duty$ = this._thingService.getThingsAttribute<number>(
      DrHarvesterSelector.duty
    );
    // this.thing$ = this._thingService.getThings();
  }
}
