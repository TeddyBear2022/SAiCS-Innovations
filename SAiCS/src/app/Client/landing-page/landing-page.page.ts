import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/app/Models/Product';
import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})


export class LandingPagePage implements OnInit {
  
  @Pipe({name: 'safeHtml'})

  
  Products: Product[]
  constructor(public popoverController: PopoverController, private api: ApiService, public dms: DomSanitizer){}
  
  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
   
  }
  GetCatalog()
  {
    this.api.GetCatalog().subscribe()
  }

  GetProductsById(id: number)
  {
    this.api.GetProductsById(id).subscribe(data =>
      {

        this.Products = data
        
        console.log(data)
      })
  }

  display(b64: string) {
    const image =  this.dms.bypassSecurityTrustUrl("data:image/jpeg;base64," + b64);
    return image
  }

}
