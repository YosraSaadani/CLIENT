import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/Entities/person';

@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.scss'],
})
export class PlistComponent implements OnInit {
  @Input() person: Person | any;
  constructor() {}

  ngOnInit(): void {}
}
