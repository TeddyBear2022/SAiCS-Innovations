import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-session',
  templateUrl: './quiz-session.page.html',
  styleUrls: ['./quiz-session.page.scss'],
})
export class QuizSessionPage implements OnInit {
  username

  constructor() { }

  ngOnInit() {
       //Username
       this.username = localStorage.getItem('UserName')
  }

}
