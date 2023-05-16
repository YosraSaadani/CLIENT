import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/Entities/person';

@Component({
  selector: 'app-plist-patient',
  templateUrl: './plist-patient.component.html',
  styleUrls: ['./plist-patient.component.scss']
})
export class PlistPatientComponent implements OnInit {
@Input() person: Person | any;
  constructor() { }

  ngOnInit(): void {
  }

}
