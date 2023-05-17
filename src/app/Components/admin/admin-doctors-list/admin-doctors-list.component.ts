import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Entities/doctor';
import { AdminService } from 'src/app/services/admin.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-admin-doctors-list',
  templateUrl: './admin-doctors-list.component.html',
  styleUrls: ['./admin-doctors-list.component.scss']
})
export class AdminDoctorsListComponent implements OnInit {

  constructor(private adminService:AdminService,private commentService:CommentService) { }

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
    this.adminService.deleteDoctorById(id).subscribe(res=>{
      console.log(res);
    })
    this.getDoctors();
  }

  ngOnInit(): void {
    this.getDoctors()
  }

}
