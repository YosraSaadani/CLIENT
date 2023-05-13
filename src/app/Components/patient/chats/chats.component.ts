import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  Persons: Person[] | any;

  constructor(private apoinS: AppointmentService, private router: Router) {}
  ngOnInit(): void {
    this.apoinS.getSortedAppointmentsPatient().subscribe((data) => {
      this.Persons = data
        .map((item) => item.doctor.person)
        .filter(
          (value, index, self) =>
            self.findIndex((item) => item._id === value._id) === index
        );

      if (this.Persons.length > 0) {
        console.log(this.Persons);
        this.router.navigate(['/messages' + this.Persons[0]._id]);
      }
    });
  }
}
