import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { MessageService } from 'src/app/services/Messages/message.service';
import { PersonService } from 'src/app/services/person.service';
import * as io from 'socket.io-client';
import { ChatService } from 'src/app/services/chat.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  person: Person | any;
  messages: any = [];
  Msgform: FormGroup;
  dateRV: Date;
  socket: any;
  myID: String;
  helper = new JwtHelperService();
  HeureRV: any;
  sendMessage() {
    console.log(this.person._id, this.Msgform.value.message);
    this.messSer
      .patientSendChatMessage({
        to: this.person._id,
        message: this.Msgform.value.message,
      })
      .subscribe((data) => {
        console.log(data);

        this.chat.sendMessage({
          to: this.person._id,
          msg: this.Msgform.value.message,
          from: this.myID,
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
    private pat: PatientService
  ) {}

  ngOnInit(): void {
    this.pat
      .getPersonByPatient(
        this.helper.decodeToken(localStorage.getItem('patientToken'))._id
      )
      .subscribe((data) => {
        this.myID = data._id;

        this.socket = io.io('http://localhost:5000');
        this.chat.connect(this.myID);
        this.Activeroute.params.subscribe((params) => {
          this.socket.on(
            'msg-recieve',
            (data: { from: String; to: String; message: String }) => {
              console.log(data);
              if (data.to == this.myID && data.from == params['id']) {
                this.messages.push({ fromSelf: false, message: data.message });
              }
            }
          );

          this.personSer.getPersonById(params['id']).subscribe((data) => {
            console.log(data);
            this.person = data;

            this.messSer
              .patientGetChatMessages({ to: this.person._id })
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
