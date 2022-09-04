import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agents-faq',
  templateUrl: './agents-faq.page.html',
  styleUrls: ['./agents-faq.page.scss'],
})
export class AgentsFaqPage implements OnInit {

  constructor(private menu: MenuController,) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
