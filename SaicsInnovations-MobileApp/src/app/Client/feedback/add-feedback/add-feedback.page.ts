import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Feedback } from 'src/app/Models/Feedback';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.page.html',
  styleUrls: ['./add-feedback.page.scss'],
})
export class AddFeedbackPage implements OnInit {
//Variables
feedbackForm: FormGroup;
myAmbassador: any;
products: any = [];
//products: Product[]
ambassador: number;
MerchCat: any = [];
session: any;
username;

constructor(
  private api: ApiService,
  public formBuilder: FormBuilder,
  public alertController: AlertController,
  public toastController: ToastController,
  private tmpStorage: TemporaryStorage,
) {
  this.feedbackForm = formBuilder.group({
    feedbackType: new FormControl('', Validators.required),
    productType: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
}


ngOnInit() {
  this.session = this.tmpStorage.getSessioninfo();
  this.username = localStorage.getItem('UserName');
  this.MyAmbassador();
  this.RetrieveInfo();
}

RetrieveInfo() {
  this.api.ClientGetMerchCat().subscribe((res) => {
    this.MerchCat = res;
  });
}

GetProductsById(event) {
  let e = event.target.value;

  this.api.PurchasedProducts().subscribe((res) => {
    this.products = res;
    console.log(this.products);
    this.products = this.products.filter((x) => x.category == e);
  });
}

MyAmbassador() {
  this.api.GetAssociatedAmbassador(this.session[0].id).subscribe((data) => {
    this.myAmbassador = data;
    console.log(this.myAmbassador);
  });
}

submitForm() {
  if (this.feedbackForm.value.feedbackType == 2) {
    this.feedbackForm.get('productType').clearValidators();
    this.feedbackForm.get('productType').updateValueAndValidity();
    this.feedbackForm.get('productName').clearValidators();
    this.feedbackForm.get('productName').updateValueAndValidity();


  }

  // To differentiate between the type of feedback
  if (this.feedbackForm.valid) {
    let feedback = {} as Feedback;
    //feedback.clientId = this.session[0].id;
    feedback.feedbackTypeId = this.feedbackForm.value.feedbackType;
    feedback.description = this.feedbackForm.value.description;
    feedback.merchandiseId = this.feedbackForm.value.productName ?? null;
    feedback.ambassadorId = this.feedbackForm.value.feedbackType == 2? this.myAmbassador.id : null;

    this.api.CreateFeedback(this.session[0].id, feedback).subscribe((res) => {
      console.log(res.body);
    });

    this.presentToast();
    history.back()
    this.feedbackForm.reset();
    //this.router.navigate(['/feedback/view-feedback']);
  } else {
    console.log('Invalid Form');
  }
}

clearControl(value)
{
  let reset = value
  
  if(reset == 2)
  {
    this.feedbackForm.get('productName').reset();
    this.feedbackForm.get('productType').reset();
  }
}

Cancel()
{
  history.back()
  //routerLink="/feedback/view-feedback"
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Feedback created successfully',
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

  Back() {
    history.back();
  }

}
