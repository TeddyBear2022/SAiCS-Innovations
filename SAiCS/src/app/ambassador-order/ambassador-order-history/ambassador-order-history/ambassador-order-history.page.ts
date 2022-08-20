import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { MenuController } from '@ionic/angular';
=======
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-ambassador-order-history',
  templateUrl: './ambassador-order-history.page.html',
  styleUrls: ['./ambassador-order-history.page.scss'],
})
export class AmbassadorOrderHistoryPage implements OnInit {

<<<<<<< Updated upstream
  constructor(private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
=======
  orders: any = []
  two= 2
  constructor(public popoverController: PopoverController, private api: ApiService) { }

  ngOnInit() {
    this.ViewHistory()
>>>>>>> Stashed changes
  }


  openOrder(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "flex";
    evt.currentTarget.className += " active";
  }

  ViewHistory()
  {
    this.api.OrderHistory(this.two.toString()).subscribe(res => {
      this.orders = res

      console.log(this.orders);
      
    })
  }

  //Profile popover
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
