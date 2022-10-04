import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-view-client-faq-details',
  templateUrl: './view-client-faq-details.page.html',
  styleUrls: ['./view-client-faq-details.page.scss'],
})
export class ViewClientFaqDetailsPage implements OnInit {

  DeliveryFAQs
  showText: any = []
  username;

  constructor(public popoverController: PopoverController,
    private api:ApiService,
    private menu:MenuController,
    private router:Router,
    private cartService: CartService){}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.username = localStorage.getItem('UserName');
    this.api.ClientSpecificFaq().subscribe(data => {
      this.DeliveryFAQs =data
      console.log(data);
      
    })
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }


  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  Back(){
   this.router.navigate(['view-client-faq']) 
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
