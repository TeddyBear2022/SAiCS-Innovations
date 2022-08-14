import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-performance-studio',
  templateUrl: './performance-studio.page.html',
  styleUrls: ['./performance-studio.page.scss'],
})
export class PerformanceStudioPage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
  }

}
