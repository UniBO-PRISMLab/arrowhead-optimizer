import { Component, OnInit } from '@angular/core';
import { IArrowheadServiceRegistry } from 'src/app/model/ah-service-registry.model';
import { ArrowheadService } from 'src/app/services/arrowhead.service';

@Component({
  selector: 'app-test-service',
  template: '{{errorMessage}}',
})
export class TestServiceComponent implements OnInit {
  public arrowheadServices: IArrowheadServiceRegistry[] | undefined;
  errorMessage: string | undefined;
  constructor(private _arrowhead: ArrowheadService) {}

  ngOnInit(): void {
    this._arrowhead.getAllServices().subscribe(
      (arrowheadServices) => {
        this.arrowheadServices = arrowheadServices;
      },
      (error: Error) => {
        console.log(error);
        this.errorMessage = error.message;
        throw error;
      }
    );
  }
}
