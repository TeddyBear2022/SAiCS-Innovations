import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-begin-course',
  templateUrl: './begin-course.page.html',
  styleUrls: ['./begin-course.page.scss'],
})
export class BeginCoursePage implements OnInit {

  username

  constructor(public popoverController: PopoverController,
    private menu:MenuController,private cartService: CartService) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');

    //Username
    this.username = localStorage.getItem('UserName')
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
  
}
