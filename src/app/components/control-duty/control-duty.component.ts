import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { IDrHarvesterInput } from 'src/app/model/dr-harvester/dr-harvester-input.model';
import { DrHarvesterService } from 'src/app/services/dr-harvester.service';
import { ThingsService } from 'src/app/services/things.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-control-duty',
  templateUrl: './control-duty.component.html',
  styleUrls: ['./control-duty.component.css'],
})
export class ControlDutyComponent implements OnInit {
  @Input() thing!: IDrHarvesterInput;
  public duty!: number;
  public simulations$: Observable<number>[] = [];
  constructor(
    private _drHarvester: DrHarvesterService,
    private _thingService: ThingsService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.duty = this.thing.duty;
    for (let percent = 0; percent <= 100; percent += 5) {
      this.getSimulation(percent);
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  getSimulation(value: number) {
    let thing = { ...this.thing };
    thing.duty = value;
    this.simulations$[value] = this._drHarvester.startSimulation(thing).pipe(
      mergeMap((job) => this._drHarvester.getSimulationUntilResult(job.jobId)),
      filter((simulation) => simulation.result != undefined),
      map((simulation) => {
        console.log(simulation.result);
        return (simulation.result?.batlifeh || 0) * 3600;
      })
    );
  }
  round(round: number): number {
    return Math.round(round);
  }

  setLifetime(value: number | null) {
    if (!value) return;
    this.duty = value;
  }

  changeDuty() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: { duty: this.duty, device: this.thing.devId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this._thingService.changeDutyCycle(this.duty).subscribe();
    });
  }
}
