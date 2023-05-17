import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-confirmation',
  templateUrl: './dialog-delete-confirmation.component.html',
  styleUrls: ['./dialog-delete-confirmation.component.scss']
})
export class DialogDeleteConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }
  confirm(){
   this.dialogRef.close(true)
  }
  close(){
    this.dialogRef.close();
  }

}
