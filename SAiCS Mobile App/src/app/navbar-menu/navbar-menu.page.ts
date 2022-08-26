import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.page.html',
  styleUrls: ['./navbar-menu.page.scss'],
})
export class NavbarMenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("working")
  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
}

