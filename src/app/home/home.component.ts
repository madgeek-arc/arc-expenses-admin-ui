import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Εφαρμογή διαχείρισης Έργων και Ινστιτούτων του ΕΚ ΑΘΗΝΑ';

  constructor() { }

  ngOnInit() {}

}
