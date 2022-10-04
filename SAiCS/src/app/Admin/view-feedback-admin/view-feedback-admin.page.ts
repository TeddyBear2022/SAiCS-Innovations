import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-feedback-admin',
  templateUrl: './view-feedback-admin.page.html',
  styleUrls: ['./view-feedback-admin.page.scss'],
})
export class ViewFeedbackAdminPage implements OnInit {

  //Variables
  FilterForm:FormGroup
  AmbassadorFeedback:any = []
  MerchFeedback:any = []
  username

  constructor(private popoverController: PopoverController, 
    private api:ApiService, 
    private menu:MenuController) { }

  ngOnInit() {

    console.log("TOken",localStorage.getItem('token')) //remove
    this.FilterForm = new FormGroup({
      feedbackType: new FormControl()
    })
    this.username = localStorage.getItem('UserName')
    this.menu.enable(true, 'admin-menu');

    this.api.ViewAmbassadorFeedbackAdmin().subscribe(data =>{
      this.AmbassadorFeedback = data
      
    })

    this.api.ViewMerchFeedbackAdmin().subscribe(data => {
      this.MerchFeedback = data
    })
  }
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  FilterSelected(){
    console.log(this.FilterForm.get(['feedbackType']).value);
    
  }
}
