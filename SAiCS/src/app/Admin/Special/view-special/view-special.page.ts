import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-special',
  templateUrl: './view-special.page.html',
  styleUrls: ['./view-special.page.scss'],
})
export class ViewSpecialPage implements OnInit {
  specials: any= []
  specialTypes: any = [];
  specialOption = 'All'
  constructor( public popoverController: PopoverController,private api: ApiService, private router: Router
    ) { }

  ngOnInit() {
    this.GetInfo()
  }

  GetInfo()
  {
      this.api.GetSpecialTypes().subscribe(res => {
        this.specialTypes = res
      })

      this.api.GetAllSpecials().subscribe(res => {
        this.specials = res
      })

  }


  createSpecial()
  {

  }

  updateSpecial(id: number)
  {
    const navigationExtras: NavigationExtras = {state: {existingSpecial: id}};
    this.router.navigate(['/update-special'], navigationExtras)
  }

  DeleteSpecial(id: number)
  {
    
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
