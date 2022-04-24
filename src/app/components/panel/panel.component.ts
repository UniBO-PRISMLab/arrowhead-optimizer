import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { ArrowheadService } from 'src/app/services/arrowhead.service';
import { ThingsService } from 'src/app/services/things.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  servicesNames = environment.arrowhead.services;
  things!: Observable<IDrHarvesterInput>[];
  constructor(
    private _thingService: ThingsService,
    private _arrowhead: ArrowheadService
  ) {}

  ngOnInit(): void {
    this.things = this.servicesNames.map((serviceName) =>
      this._arrowhead.getService(serviceName).pipe(
        mergeMap((service) => {
          const url = `${service.provider.address}:${service.provider.port}`;
          return this._thingService.getThings(url, service.serviceUri);
        }), map(things => {
          things.batV = 2.2;
          return things;
        })
      )
    );
  }
}
