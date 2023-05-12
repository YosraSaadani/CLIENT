import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  Persons: Person[];

  constructor(private apoinS: AppointmentService) {}

  ngOnInit(): void {
    this.apoinS.getSortedAppointments().subscribe((data) => {
      this.Persons = data
        .map((item) => item.Patient.person)
        .filter(
          (value, index, self) =>
            self.findIndex((item) => item._id === value._id) === index
        );
    });
  }
}
