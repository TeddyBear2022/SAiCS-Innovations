import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { Checkout } from 'src/app/Models/ViewModels/Checkout';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('stepper') stepper;
  selectedFile: any;
  userAddress: any;
  deliveryOption = false;
  SelectedDel = "";
  deliveryArr: any;
  checkout: FormGroup;
  session: any;
  isModalOpen = false;
  AgentAccount: any;
  items: any = [];
  OrdSumAddress: any;
  OrdSmry: any;
//
  firstFormGroup = this.fb.group({
    address: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    pdfFile: ['', Validators.required],
    SelectedDel: ['', Validators.required]
  });

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    public alertController: AlertController,
    private alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private tmpStorage: TemporaryStorage,
    private menu: MenuController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.GetAddress();
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.OrdSmry = JSON.parse(localStorage.getItem('checkout'))
    this.GetDelOptions();
    this.AgentAccountInfo();
    this.checkout = this.fb.group({
      address: ['', [Validators.required]],
      pdfFile: ['', [Validators.required]],
    });
  }

  ionViewWillEnter()
  {
    this.GetAddress();
    this.GetDelOptions();
    this.AgentAccountInfo();
  }

  ViewCart() {
    console.log('cart');
    this.route.navigate(['tabs/tab2']);
  }


  toggleValue()
  {
   console.log(this.deliveryOption);
   if(this.deliveryOption == false)
   {
    this.secondFormGroup.value.SelectedDel = ""
    this.firstFormGroup.value.address == ""
   }
   
  }



SubmitAddressFrom()
{
   if(this.deliveryOption == true && this.firstFormGroup.value.address == "")
   {
     this.Notif("Please select and address")
   }
   else
   {
    this.firstFormGroup.get('address').clearValidators();
    this.firstFormGroup.get('address').updateValueAndValidity();
    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    deliverValue.deliveryOption = this.deliveryOption
    deliverValue.addressId = this.deliveryOption == true ? this.firstFormGroup.value.address : null;
    localStorage.setItem('checkout', JSON.stringify(deliverValue));
    
    this.stepper.next()
   }
}

PaymentForm()
{
  if (this.deliveryOption == false) {
    this.secondFormGroup.get('SelectedDel').clearValidators();
    this.secondFormGroup.get('SelectedDel').updateValueAndValidity();
  }

  if(this.secondFormGroup.valid)
  {
    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    deliverValue.delveryId = this.secondFormGroup.value.SelectedDel
    localStorage.setItem('checkout', JSON.stringify(deliverValue));
    this.stepper.next()
  }
  else
  {
    console.log("Nah");
  }
}

GetSummaryAddress()
{
  this.OrdSumAddress = this.userAddress.filter(x => x.id == this.firstFormGroup.value.address);
}

  onSelectChange(event) {
    // let value = event.target.value;
    // this.SelectedDel = value;
    console.log(this.secondFormGroup.value.SelectedDel);
    
  }



  GetAddress() {
    this.api.GetAddress(this.session[0].id).subscribe((data) => {
      this.userAddress = data;
      console.log(this.userAddress);
    });
  }

  GetDelOptions() {
    let data;
    this.api.GetUserDeliveryTypes().subscribe((res) => {
      data = res;
      this.deliveryArr = data;
    });
  }

  AgentAccountInfo() {
    this.api.AgentAccountInfo(this.session[0].id).subscribe((data) => {
      this.AgentAccount = data;
      console.log(this.AgentAccount);
    });
  }

  onFileSelected(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      this.selectedFile = encoded;
      console.log('encoded successfully');
    };
  }


  ViewAddress(id: number)
  {
    localStorage.setItem('EditAddressId', JSON.stringify(id));
    this.route.navigate(['/address']);
  }

  PlaceOrder() {
    if(this.selectedFile)
    {
     var pushToCart = [];
      for (let item of this.items) {
        let cart = {} as CartItem;
        cart.merchandiseId = item.spId != null ? null : item.id;
        cart.specialId = item.spId ?? null;
        cart.quantity = item.quantity;
        cart.price = item.price;
        pushToCart.push(cart);
      }

    pushToCart.forEach((e) => {
        this.api.ClientAddToCart(this.session[0].id, e).subscribe((res) => {
          console.log(res.body);
        });
      });

         let order = {} as Checkout;
      order.addressId = this.deliveryOption == true ? parseInt(this.firstFormGroup.value.address) : null;
      order.userId = this.session[0].id;
      order.orderStatusId = 1;
      order.proofOfPayment = this.selectedFile;
      order.Vat =parseFloat(this.OrdSmry.vatPercentage);
      order.DeliveryTypeId = parseInt(this.secondFormGroup.value.SelectedDel);
      order.ShippingCost = this.deliveryArr.find(
        (x) => x?.id === parseInt(this.secondFormGroup.value.SelectedDel)
      )?.price;

      this.api.ClientCheckout(order).subscribe((res) => {
        console.log(res.body);
        if (res.status === 200) {
          this.api.OrderEmail(this.session[0].email, parseInt(res.body)).subscribe()
          this.api.AmbassaodorNotification(this.AgentAccount.email, parseInt(res.body)).subscribe()
          //this.ClientEmail(this.username, this.session[0].email, address, res.body, order.ShippingCost, "Client")
          //this.ClientEmail(this.username, this.AgentAccount.email, address, res.body, order.ShippingCost, "Ambassador")
          this.showAlert();


        } else {
          this.ErrorAlert();
        }
      });
      console.log(order)
    }
    else
    {
      console.log("Inavlid form");
      
    }
   
  }

  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{
      text: 'OK'}]
    });
  
    await alert.present();
    
  }

  ClearStore()
  {
    var orderdetails = {
      itemCount: 0,
      vat: 0,
      vatPercentage: 0,
      subtotal: 0,
      totalCost: 0,
      deliveryOption: 0,
      delveryId: 0,
    };
    localStorage.setItem('checkout', JSON.stringify(orderdetails));
  }

  async ErrorAlert() {
    const alert = await this.alert.create({
      header: 'OOPS!',
      message:
        'Something went wrong during the processing of this order. Please try again!',
      buttons: [{ text: 'OK' }],
    });

    await alert.present();
  }

  async showAlert() {
    const alert = await this.alert.create({
      header: 'Thank You For Your Order!',
      message:
        'At SAICS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintainable lifestyle with our top of the range and clinically tested products',
      buttons: [
        {
          text: 'Back To Home',
          handler: () => {
            var orderdetails = {
              itemCount: 0,
              vat: 0,
              vatPercentage: 0,
              subtotal: 0,
              totalCost: 0,
              deliveryOption: 0,
              delveryId: 0,
            };
            localStorage.setItem('checkout', JSON.stringify(orderdetails));
            localStorage.removeItem('cart_items');
            this.route.navigate(['./landing-page']);
          },
        },
      ],
    });
    await alert.present();
  }

}
