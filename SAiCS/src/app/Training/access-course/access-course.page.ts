import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-access-course',
  templateUrl: './access-course.page.html',
  styleUrls: ['./access-course.page.scss'],
})
export class AccessCoursePage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    // this.menu.open('client-menu')
  }

}
