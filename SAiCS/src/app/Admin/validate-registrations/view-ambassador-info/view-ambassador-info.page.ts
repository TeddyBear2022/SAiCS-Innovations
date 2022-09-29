import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-ambassador-info',
  templateUrl: './view-ambassador-info.page.html',
  styleUrls: ['./view-ambassador-info.page.scss'],
})
export class ViewAmbassadorInfoPage implements OnInit {

  //Variables 
  registrationInfo
  registrationFetched: boolean = false
  username

  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private route:Router, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.SpecificRegistration().subscribe(data => {
      this.registrationFetched =true
      this.registrationInfo =data
      console.log(data)
    })
    this.username = localStorage.getItem('UserName')
  }

  ionViewDidEnter(){
    this.api.SpecificRegistration().subscribe(data => {
      this.registrationInfo =data
      console.log(data)
      
    })
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

  Back(){
    this.route.navigate(['validate-registrations'])
  }

}
