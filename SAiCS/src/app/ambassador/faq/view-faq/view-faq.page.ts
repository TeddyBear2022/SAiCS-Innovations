import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.page.html',
  styleUrls: ['./view-faq.page.scss'],
})
export class ViewFaqPage implements OnInit {
  
  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
