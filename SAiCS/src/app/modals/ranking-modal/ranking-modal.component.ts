import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-modal',
  templateUrl: './ranking-modal.component.html',
  styleUrls: ['./ranking-modal.component.scss'],
})
export class RankingModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  Promote(){
    console.log("promote request")
  }
  Demote(){
    console.log("demote request");
    
  }
}
