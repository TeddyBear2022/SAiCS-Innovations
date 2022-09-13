import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.page.html',
  styleUrls: ['./view-feedback.page.scss'],
})
export class ViewFeedbackPage implements OnInit {

  //Variables
  AmbassadorFeedback = []
  ProductFeedback = []
  session: any;
  select = new FormControl();
  p
  p1
  
  constructor(private alert: AlertController, private menu: MenuController,private api: ApiService, private tmpStorage:TemporaryStorage,public popoverController: PopoverController,public alertController: AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo()

    this.select.setValue("")
    
  }

  ionViewDidEnter()
  {
    this.select.setValue("")
    
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
     await this.api.GetAmbassadorFeedback(this.session[0].id).subscribe(data => {
       this.AmbassadorFeedback = data
       console.log(this.AmbassadorFeedback)
     })
   }

   GetProductFeedback()
   {
     this.api.GetProductFeedback(this.session[0].id).subscribe(data => {
      this.ProductFeedback = data
       console.log(this.ProductFeedback)
     })
   }


   DeleteFeedback(id: number, feedbackType: number)
   {
     this.api.DeleteFeedback(id).subscribe((data) =>{
      if(feedbackType == 1)
     {
      this.GetProductFeedback()
     }
     else if(feedbackType == 2)
     {
      this.GetAmbassadorFeedback()
     }

      console.log(data);})
   }

   PresentFeeback(value)
   {
     let present = value

     if(present == 1)
     {
      this.GetProductFeedback()
     }
     else if(present == 2)
     {
      this.GetAmbassadorFeedback()
     }
   }

   async ErrorAlert(message: string) {
    const alert = await this.alert.create({
      header: "Invalid Form",
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
    
  }

   //alerts
  //  async presentAlert(id: number) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'alertCancel',
  //     header: 'Delete REQUEST',
  //     message: 'Are you sure you want to permanently delete this feedback?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
            
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {
  //           this.DeleteFeedback(id)
  //           console.log(id);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();}
}
