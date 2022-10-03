import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-view-client-faq',
  templateUrl: './view-client-faq.page.html',
  styleUrls: ['./view-client-faq.page.scss'],
})
export class ViewClientFaqPage implements OnInit {
  constructor(public popoverController: PopoverController,
    private api:ApiService,
    private menu:MenuController,
    private router:Router,
    private cartService: CartService){}

    //Variables
  faqCategories: any
  username;

  

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.username = localStorage.getItem('UserName');
    this.api.GetClientFAQS().subscribe(data => {
      this.faqCategories = data
      console.log(this.faqCategories)
    })
    
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }


  showFAQ(catId){
    console.log(catId);
    localStorage.setItem('faq', catId)
    this.router.navigate(['/view-client-faq-details'])
  }


  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

}
