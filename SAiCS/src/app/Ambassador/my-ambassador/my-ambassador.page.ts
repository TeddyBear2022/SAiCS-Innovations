import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-my-ambassador',
  templateUrl: './my-ambassador.page.html',
  styleUrls: ['./my-ambassador.page.scss'],
})
export class MyAmbassadorPage implements OnInit {

  session: any;
  myAmbassador: any;
  username;

  constructor(
    public popoverController: PopoverController,
    private api: ApiService,
    private menu: MenuController,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService
  ) {}

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.username = localStorage.getItem('UserName');
    this.menu.enable(true, 'ambassador-menu');
    this.MyAmbassador();
  }

  MyAmbassador() {
    this.api.GetAssociatedAmbassador(this.session[0].id).subscribe((data) => {
      this.myAmbassador = data;
      console.log(this.myAmbassador);
    });
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

}
