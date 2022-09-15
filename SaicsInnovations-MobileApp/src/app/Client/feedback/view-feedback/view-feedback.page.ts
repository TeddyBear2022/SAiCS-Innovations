import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.page.html',
  styleUrls: ['./view-feedback.page.scss'],
})
export class ViewFeedbackPage implements OnInit {

  //Variables
  AmbassadorFeedback = []
  ProductFeedback = []
  constructor( private api: ApiService, public popoverController: PopoverController,public alertController: AlertController) { }

  ngOnInit() {
    setInterval(() =>this.GetAmbassadorFeedback(), 2100)
    setInterval(() =>this.GetProductFeedback(), 2100)
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
     this.api.DeleteFeedback(id).subscribe((data) =>{
      console.log(data);})
   }

   //alerts
   async presentAlert(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'alertCancel',
      header: 'Delete REQUEST',
      message: 'Are you sure you want to permanently delete this feedback?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.DeleteFeedback(id)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();}
}
