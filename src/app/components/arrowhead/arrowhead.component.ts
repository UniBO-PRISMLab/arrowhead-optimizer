import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IArrowheadAllReply } from 'src/app/model/arrowhead/arrowheadAllReply.model';
import { IArrowheadServiceRegistry } from 'src/app/model/arrowhead/arrowheadServiceRegistry.model';
import { ArrowheadService } from 'src/app/services/arrowhead.service';

@Component({
  selector: 'app-arrowhead',
  template: `
    <!--   <observable-handlers
    [observable$]="arrowheadServices$"
  ></observable-handlers> -->

    <observable-handlers [observable$]="gasSensor$"></observable-handlers>
  `,
})
export class ArrowheadComponent implements OnInit {
  public arrowheadServices$: Observable<IArrowheadAllReply> =
    new Observable<IArrowheadAllReply>();
  public gasSensor$: Observable<IArrowheadServiceRegistry> =
    new Observable<IArrowheadServiceRegistry>();

  constructor(private _arrowhead: ArrowheadService) {}

  ngOnInit(): void {
    // this.arrowheadServices$ = this._arrowhead.getAllServices();

    this.gasSensor$ = this._arrowhead.getService('gas_sensor_status_provider');
  }
}
