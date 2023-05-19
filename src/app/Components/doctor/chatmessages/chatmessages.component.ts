import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { MessageService } from 'src/app/services/Messages/message.service';
import { PersonService } from 'src/app/services/person.service';
import * as io from 'socket.io-client';
import { ChatService } from 'src/app/services/chat.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-chatmessages',
  templateUrl: './chatmessages.component.html',
  styleUrls: ['./chatmessages.component.scss'],
})
export class ChatmessagesComponent implements OnInit {
  person: Person | any;
  messages: any = [];
  Msgform: FormGroup;
  socket: any;
  dateRV: Date;
  helper = new JwtHelperService();
  HeureRV: any;
  MyID: String;
  sendMessage() {
    this.messSer
      .doctortSendChatMessage({
        to: this.person._id,
        message: this.Msgform.value.message,
      })
      .subscribe((data) => {
        this.chat.sendMessage({
          to: this.person._id,
          msg: this.Msgform.value.message,
          from: this.MyID,
        });
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
    private formBuilder: FormBuilder,
    private chat: ChatService,
    private doc: DoctorService
  ) {}

  ngOnInit(): void {
    this.doc
      .getPersonByDoctor(
        this.helper.decodeToken(localStorage.getItem('doctorToken'))._id
      )
      .subscribe((data) => {
        this.MyID = data._id;
        this.socket = io.io('http://localhost:5000');
        this.chat.connect(this.MyID);

        this.Activeroute.params.subscribe((params) => {
          this.socket.on(
            'msg-recieve',
            (data: { from: String; to: String; message: String }) => {
              if (
                data.to.toString() == this.MyID &&
                data.from.toString() == this.person._id
              ) {
                if (
                  this.messages[this.messages.length - 1].message ==
                    data.message.toString() &&
                  this.messages[this.messages.length - 1].fromSelf == false
                ) {
                } else {
                  this.messages.push({
                    fromSelf: false,
                    message: data.message,
                  });
                }
              }
            }
          );

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
      });
  }
}
