import { Component, OnInit } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { ThingsService } from 'src/app/services/things.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  servicesNames = environment.arrowhead.services;
  descriptions: { [key: string]: any } = environment.paths;
  things!: {
    name: string;
    description: string;
    data$: Observable<IDrHarvesterInput>;
  }[];
  constructor(private _thingService: ThingsService) {}

  ngOnInit(): void {
    this.things = this.servicesNames.map((serviceName) => {
      return {
        name: this.descriptions[serviceName].name,
        description: this.descriptions[serviceName].description,
        data$: this._thingService.getThings(serviceName).pipe(
          tap((service) => console.log(service))
          /*           map((things) => {
            //todo: this is only for tests
            things.batV = 2.55;
            return things;
          }) */
        ),
      };
    });
  }

  updateThing(serviceName: string) {
    for (let thing of this.things)
      if (thing.name === this.descriptions[serviceName].name)
        thing.data$ = this._thingService
          .getThings(serviceName, false)
          .pipe
          /*           delay(5000),
          map((things) => {
            //todo: this is only for tests
            things.batV = 2.55;
            return things;
          }) */
          ();
  }
}
