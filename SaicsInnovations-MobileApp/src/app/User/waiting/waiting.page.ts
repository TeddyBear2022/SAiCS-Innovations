import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  Home(){
    this.router.navigate(['home'])
  }
}
