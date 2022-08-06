import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Feedback } from 'src/app/Models/Feedback';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  //Variables
  feedbackForm: FormGroup
  myAmbassador = []
  //products: Product[]
  ambassador: number
  constructor(
  private api: ApiService, public popoverController: PopoverController,public formBuilder: FormBuilder,public alertController: AlertController,public toastController: ToastController){
    
    this.feedbackForm = formBuilder.group({
      feedbackType: [''],
      clientId: 1,
      ambassador: [''],
      productType: [''],
      productName: [''],
      description: ['']
  });
  }
  // Show Profile option when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() {
    this.MyAmbassador()
  }

  GetProductsById(id: number)
  {
    // this.api.GetProductsById(id).subscribe(data => {
    //   this.products = data
    //   console.log(`id: ${id}`)
    //   console.log(this.products)
    // })
  }

  MyAmbassador()
  {
     
     this.api.MyAmbassador(1).subscribe(data => {
       this.myAmbassador = data
       console.log(this.myAmbassador)
     }
   )
  }

  submitForm(feedbackType: number){ 
   
console.log(feedbackType)
// To differentiate between the type of feedback
   if(feedbackType == 1)
   {
    let feedback = {} as Feedback
    feedback.clientId = this.feedbackForm.value.clientId
    feedback.feedbackTypeId = this.feedbackForm.value.feedbackType
    feedback.description = this.feedbackForm.value.description
    feedback.productId = this.feedbackForm.value.productName
    this.api.CreateFeedback(feedback).subscribe()
    console.log(feedback)

   }
   else if (feedbackType == 2)
   {
    let feedback = {} as Feedback
    feedback.clientId = this.feedbackForm.value.clientId
    feedback.feedbackTypeId = this.feedbackForm.value.feedbackType
    feedback.description = this.feedbackForm.value.description
    feedback.ambassadorId= 1
    this.api.CreateFeedback(feedback).subscribe()
    console.log(feedback)
   }
    
   // alert user and reset form
   this.presentToast()
    this.feedbackForm.reset()
    this.ngOnInit()
  }

  //alerts
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alertCancel',
      header: 'CANCEL REQUEST',
      message: 'Are you sure you want to cancel?',
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
            this.feedbackForm.reset()
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();}

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Feedback created successfully',
        duration: 2000
      });
      toast.present();
    }
}
