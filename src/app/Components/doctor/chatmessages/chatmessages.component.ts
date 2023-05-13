import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { MessageService } from 'src/app/services/Messages/message.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-chatmessages',
  templateUrl: './chatmessages.component.html',
  styleUrls: ['./chatmessages.component.scss'],
})
export class ChatmessagesComponent implements OnInit {
  person: Person | any;
  messages: any = [];
  Msgform: FormGroup;
  dateRV: Date;
  HeureRV: any;
  sendMessage() {
    console.log(this.person._id, this.Msgform.value.message);
    this.messSer
      .doctortSendChatMessage({
        to: this.person._id,
        message: this.Msgform.value.message,
      })
      .subscribe((data) => {
        console.log(data);
        this.messages.push({
          fromSelf: true,
          message: this.Msgform.value.message,
        });
        this.Msgform.reset();
      });
  }
  constructor(
    // private chatS: ChatService,
    // private auth: AuthService,
    private Activeroute: ActivatedRoute,
    private personSer: PersonService,
    private AppoiS: AppointmentService,
    private messSer: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Activeroute.params.subscribe((params) => {
      this.personSer.getPersonById(params['id']).subscribe((data) => {
        this.person = data;
        this.AppoiS.getLatestPersoAppointment(this.person._id).subscribe(
          (data) => {
            this.dateRV = data[0].dateRV;
            this.HeureRV = data[0].heureRV;
          }
        );
        this.messSer
          .doctorGetChatMessages({ to: this.person._id })
          .subscribe((data) => {
            this.messages = data;
            console.log(this.messages);
          });
      });
    });
    this.Msgform = this.formBuilder.nonNullable.group({
      message: [''],
    });
    // this.chatS.getMessages().subscribe((data) => {
    //   this.messages = data;
    // });
  }
}
