import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Feedback } from 'src/app/Models/feedback';
import { FeedbackVM } from 'src/app/Models/FeedbackVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.page.html',
  styleUrls: ['./view-feedback.page.scss'],
})
export class ViewFeedbackPage implements OnInit {

  AmbassadorFeedback = []
  ProductFeedback = []

  constructor(private api: ApiService, public popoverController: PopoverController, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.GetAmbassadorFeedback()
    this.GetProductFeedback()
  }

   // profile popover 
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

   async GetAmbassadorFeedback()
   {
     await this.api.GetAmbassadorFeedback().subscribe(data => {
       this.AmbassadorFeedback = data
       console.log(this.AmbassadorFeedback)
     })
   }

   GetProductFeedback()
   {
     this.api.GetProductFeedback().subscribe(data => {
      this.ProductFeedback = data
       console.log(this.ProductFeedback)
       
     })
   }

   DeleteFeedback(id: number)
   {
     this.api.DeleteFeedback(id).subscribe()
   }

}
