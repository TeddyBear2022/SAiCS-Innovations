import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ambassador-order-history',
  templateUrl: './ambassador-order-history.page.html',
  styleUrls: ['./ambassador-order-history.page.scss'],
})
export class AmbassadorOrderHistoryPage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
