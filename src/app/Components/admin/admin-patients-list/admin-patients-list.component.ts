import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/Entities/patient';
import { AdminService } from 'src/app/services/admin.service';
import { DialogDeleteConfirmationComponent } from '../dialog-delete-confirmation/dialog-delete-confirmation.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.scss']
})
export class AdminPatientsListComponent implements OnInit {
  private config: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(private dialog:MatDialog,private adminService:AdminService,private snackBar: MatSnackBar,)
   {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.panelClass = 'success';
    }

  patients:Patient[];

  getPatients()
  {
    this.adminService.getPatients().subscribe(res=>{
      this.patients=res;
      console.log(res);  
    })
  }

  deletePatientById(id:string)
  {
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent,{width:"400px",height:"auto"});
    dialogRef.afterClosed().subscribe(result=>{
      if(result == true)
      {
        this.adminService.deletePatientById(id).subscribe(res=>{
          console.log(res);
          this.snackBar.open('Deleted Successfully','',{
            duration:5000,
            panelClass:'success'
          })
          this.getPatients();
        },
        (err)=>{
          console.log(err.message);
          this.snackBar.open(err.message,'',{
            duration:5000,
            panelClass:'Error'
          })
          
        })
        
      }
    })
   
  }
  ngOnInit(): void {
    this.getPatients();
  }

}
