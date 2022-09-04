import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-orders-faq',
  templateUrl: './orders-faq.page.html',
  styleUrls: ['./orders-faq.page.scss'],
})
export class OrdersFaqPage implements OnInit {

  constructor(private menu: MenuController,) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
