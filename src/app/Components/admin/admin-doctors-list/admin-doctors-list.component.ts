import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Entities/doctor';
import { AdminService } from 'src/app/services/admin.service';
import { CommentService } from 'src/app/services/comment.service';
import { DialogDeleteConfirmationComponent } from '../dialog-delete-confirmation/dialog-delete-confirmation.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-doctors-list',
  templateUrl: './admin-doctors-list.component.html',
  styleUrls: ['./admin-doctors-list.component.scss']
})
export class AdminDoctorsListComponent implements OnInit {
  private config: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(private dialog:MatDialog,private adminService:AdminService,private commentService:CommentService,private snackBar: MatSnackBar,
    ) {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.panelClass = 'success';
   }

  doctors!:Doctor[];
  
  getDoctors()
  {
    this.adminService.getDoctors().subscribe(res=>{
      this.doctors=res;
      this.doctors.forEach(elt=>
        {this.commentService.getCommentsByDoctorId(elt._id).subscribe(data=>{
          let rate=0;
          data.forEach(data1=>rate+=data1.rating);
          if (data.length!=0)
          {
          elt.rating=rate/data.length;
          }
          else 
          {
            elt.rating=0;
          }

        }
      );
      
      

    })
  });
  }

  deleteDoctorById(id:string)
  {
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent,{width:"400px",height:"auto"});
    dialogRef.afterClosed().subscribe(result=>{
      if(result == true)
      {
        this.adminService.deleteDoctorById(id).subscribe(res=>{
          console.log(res);
          this.snackBar.open('Deleted Successfully','',{
            duration:5000,
            panelClass:'success'
          });
          this.getDoctors();
        },
        (err:HttpErrorResponse)=>{
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
    this.getDoctors()
  }

}
