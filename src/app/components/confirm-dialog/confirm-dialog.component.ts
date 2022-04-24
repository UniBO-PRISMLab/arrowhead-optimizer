import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlDutyComponent } from '../control-duty/control-duty.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ControlDutyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { duty: number; device: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
