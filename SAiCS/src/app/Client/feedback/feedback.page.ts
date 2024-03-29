import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
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
    public popoverController: PopoverController,
    private menu: MenuController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    private tmpStorage: TemporaryStorage,
    private router: Router,
    private cartService: CartService
  ) {
    this.feedbackForm = formBuilder.group({
      feedbackType: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
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
    this.session = this.tmpStorage.getSessioninfo();
    this.username = localStorage.getItem('UserName');
    this.menu.enable(true, 'client-menu');
    this.MyAmbassador();
    this.RetrieveInfo();
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
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
  
  //alerts
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'alertCancel',
  //     header: 'CANCEL REQUEST',
  //     message: 'Are you sure you want to cancel?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         },
  //       },SAiCS\src\app\Client\feedback\view-feedback\view-feedback.page.html
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.feedbackForm.reset();
  //           console.log('Confirm Ok');
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Feedback created successfully',
      duration: 2000,
    });
    toast.present();
  }
}
