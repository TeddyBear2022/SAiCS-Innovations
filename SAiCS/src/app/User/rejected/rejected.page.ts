import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.page.html',
  styleUrls: ['./rejected.page.scss'],
})
export class RejectedPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Home(){
    this.router.navigate(['home'])
  }
}
