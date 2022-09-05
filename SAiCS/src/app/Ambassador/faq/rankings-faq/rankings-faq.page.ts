import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rankings-faq',
  templateUrl: './rankings-faq.page.html',
  styleUrls: ['./rankings-faq.page.scss'],
})
export class RankingsFaqPage implements OnInit {

  constructor(private menu: MenuController,) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
