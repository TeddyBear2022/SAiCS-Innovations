import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-ambassador-feedback',
  templateUrl: './view-ambassador-feedback.page.html',
  styleUrls: ['./view-ambassador-feedback.page.scss'],
})
export class ViewAmbassadorFeedbackPage implements OnInit {

  //Variables
  feedbacks:any = []
  username
  noResults:boolean = false
  constructor(private menu:MenuController,
    private api:ApiService,
    private popoverController:PopoverController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.Data();
    this.username = localStorage.getItem('UserName')
  }
  ionViewDidEnter(){
    this.Data()
    this.username = localStorage.getItem('UserName')
  }

  Data(){
    this.api.ViewAmbassadorFeedback().subscribe(data => {
      this.feedbacks = data
      console.log(data)
    },(response: HttpErrorResponse) => {
        
      if (response.status === 404) {
        
         this.noResults == true;
         console.log("NoResults")
      }
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


}
