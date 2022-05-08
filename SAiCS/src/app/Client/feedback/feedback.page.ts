import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, NgModel} from '@angular/forms';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Product } from 'src/app/Models/Product';
import { Feedback } from 'src/app/Models/feedback';
import { AmbassadorVM } from 'src/app/Models/AmbassadorVM';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackForm: FormGroup
  myAmbassador = []
  //for input 
  ambassador: number
  constructor(
  private api: ApiService,
  public popoverController: PopoverController, 
  public formBuilder: FormBuilder){
    this.feedbackForm = formBuilder.group({
      feedbackType: [''],
      clientId: 1,
      ambassador: [''],
      productType: [''],
      productName: [''],
      description: ['']
  });
  }

  products: Product[]

  // profile popover 
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ngOnInit() { this.MyAmbassador()}

  GetProductsById(id: number)
  {
    this.api.GetProductsById(id).subscribe(data => {
      this.products = data
      console.log(`id: ${id}`)
      console.log(this.products)
    })
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
    console.log(this.ambassador)
  //  if(feedbackType == 1)
  //  {
  //   let feedback = {} as Feedback
  //   feedback.clientId = this.feedbackForm.value.clientId
  //   feedback.feedbackTypeId = this.feedbackForm.value.feedbackType
  //   feedback.description = this.feedbackForm.value.description
  //   feedback.productId = this.feedbackForm.value.productName
  //   this.api.CreateFeedback(feedback).subscribe(() => {"Feedback created successfully"})

  //  }
  //  else if (feedbackType == 2)
  //  {
  //   let feedback = {} as Feedback
  //   feedback.clientId = this.feedbackForm.value.clientId
  //   feedback.feedbackTypeId = this.feedbackForm.value.feedbackType
  //   feedback.description = this.feedbackForm.value.description
  //   feedback.ambassadorId= this.feedbackForm.value.ambassador
  //   this.api.CreateFeedback(feedback).subscribe(() => {"Feedback created successfully"})
  //  }
    
    this.feedbackForm.reset()
  }

  

}




