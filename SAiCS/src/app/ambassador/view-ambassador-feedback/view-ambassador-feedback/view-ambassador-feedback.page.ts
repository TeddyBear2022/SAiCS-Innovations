import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-view-ambassador-feedback',
  templateUrl: './view-ambassador-feedback.page.html',
  styleUrls: ['./view-ambassador-feedback.page.scss'],
})
export class ViewAmbassadorFeedbackPage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
