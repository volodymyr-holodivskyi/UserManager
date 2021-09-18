import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}

  public confirmMessage: string | undefined;
}
