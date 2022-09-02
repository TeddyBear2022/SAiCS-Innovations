import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  MenuController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Feedback } from 'src/app/Models/Feedback';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  //Variables
  feedbackForm: FormGroup;
  myAmbassador: any
  products: any = [];
  //products: Product[]
  ambassador: number;
  MerchCat: any = [];
  session: any 

  constructor(
    private api: ApiService,
    public popoverController: PopoverController,
    private menu: MenuController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    private tmpStorage:TemporaryStorage,
    private router: Router
  ) {
    this.feedbackForm = formBuilder.group({
      feedbackType: new FormControl('', Validators.required),
      productType: new FormControl(''),
      productName: new FormControl(''),
      description: new FormControl('', Validators.required),
    });
  }
  // Show Profile option when icon on right of navbar clicked function
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'client-menu');
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

  submitForm(feedbackType: number) {
    // To differentiate between the type of feedback
    if (this.feedbackForm.valid) {
      let feedback = {} as Feedback;
      //feedback.clientId = this.session[0].id;
      feedback.feedbackTypeId = this.feedbackForm.value.feedbackType;
      feedback.description = this.feedbackForm.value.description;
      feedback.merchandiseId = this.feedbackForm.value.productName ?? null; 
      feedback.ambassadorId = this.myAmbassador.id ?? null;
      this.api.CreateFeedback(this.session[0].id,feedback).subscribe(res => {console.log(res)});
      

    this.presentToast();
    this.feedbackForm.reset();
    this.router.navigate(['/view-feedback'])
   
    }
    
    else{
      console.log("Invalid Form");
      
    }

   
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
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.feedbackForm.reset();
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Feedback created successfully',
      duration: 2000,
    });
    toast.present();
  }
}
