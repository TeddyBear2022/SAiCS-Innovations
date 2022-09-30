import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.page.html',
  styleUrls: ['./view-faq.page.scss'],
})
export class ViewFaqPage implements OnInit {

  //Variables
  faqCategories
  username

  constructor(private menu:MenuController, 
    private api:ApiService, 
    private route:Router, 
    private popoverController:PopoverController) { }

  ngOnInit() {
    //Menu
    this.menu.enable(true, 'ambassador-menu');
    this.api.GetAmbassadorFAQS().subscribe(data => {
      this.faqCategories = data
      console.log(this.faqCategories)
    })
    console.log("show data")
    this.username = localStorage.getItem('UserName')
  }

  showFAQ(catId){
    console.log(catId);
    
    localStorage.setItem('faq', catId)
    this.route.navigate(['/view-faq-details'])
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
