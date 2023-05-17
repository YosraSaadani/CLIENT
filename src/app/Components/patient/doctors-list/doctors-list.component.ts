import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Entities/doctor';
import { CommentService } from 'src/app/services/comment.service';
import { DoctorService } from 'src/app/services/doctor.service';



@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctorsList!: Doctor[];
  constructor(private doctorService: DoctorService,private commentService:CommentService) {}

  search(name: string)
  {
    this.doctorService.getDoctorByName(name).subscribe(data=>this.doctorsList=data);
  }

  searchBySpec(name: string)
  {
    if(name=='All')
    {
      this.doctorService
      .getDoctors()
      .subscribe((data) => (this.doctorsList = data));
    }
    else
    this.doctorService.getDoctorsBySpeciality(name).subscribe(data=>this.doctorsList=data);
  }


  ngOnInit(): void {
    this.doctorService
      .getDoctors()
      .subscribe((data) => {(this.doctorsList = data);
        
        data.forEach(elt=>this.commentService.getCommentsByDoctorId(elt._id).subscribe(data1=>{
          let rate=0;
          data1.forEach(elt1=>rate+=elt1.rating);
          elt.rating=rate/data1.length;
          console.log(elt.rating);
          console.log(data1.length);
         console.log(elt.rating);
          
        }))
        
        
  });
      
  }
}
