import { Component, OnInit } from '@angular/core';
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
  selectedFile: any;
  userAddress: any;
  deliveryOption = false;
  SelectedDel;
  SubTotal;
  deliveryArr: any;
  checkout: FormGroup;
  OdrSmry: any;
  session: any;
  isModalOpen = false;
  AgentAccount: any;
  items: any = [];
  isLinear = false;

  firstFormGroup = this.fb.group({
    address: ['', Validators.required],
    DelCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    public alertController: AlertController,
    private modal: ModalController,
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
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.deliveryOption = this.OdrSmry.deliveryOption;
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.GetDelOptions();
    this.checkout = this.fb.group({
      address: ['', [Validators.required]],
      pdfFile: ['', [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.GetAddress();
    this.AgentAccountInfo();
    this.GetDelOptions();
  }

  get OrderTotal() {
    if (this.deliveryOption == true) {
      const sp = this.deliveryArr?.find(
        (x) => x?.id === parseInt(this.SelectedDel)
      )?.price;
      return this.SubTotal + parseInt(sp);
    } else {
      return this.SubTotal;
    }
  }

  onSelectChange(event) {
    let value = event.target.value;
    this.SelectedDel = value;
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
    this.SelectedDel = this.OdrSmry.delveryId;
    this.SubTotal = this.OdrSmry.subtotal;
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

  submitForm() {
    if (this.deliveryOption == false) {
      this.checkout.get('address').clearValidators();
      this.checkout.get('address').updateValueAndValidity();
    }

    if (this.checkout.valid) {
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
      order.addressId =
        this.deliveryOption == true ? this.checkout.value.address : null;
      order.userId = this.session[0].id;
      order.orderStatusId = 1;
      order.proofOfPayment = this.selectedFile;
      order.Vat =parseFloat(this.OdrSmry.vatPercentage);
      order.DeliveryTypeId = this.OdrSmry.delveryId;
      order.ShippingCost = this.deliveryArr.find(
        (x) => x?.id === parseInt(this.SelectedDel)
      )?.price;

      this.api.ClientCheckout(order).subscribe((res) => {
        console.log(res.body);
        if (res.body == 'Placed') {
          this.checkout.get('address').setValidators(Validators.required);
          this.checkout.get('address').updateValueAndValidity();

          this.showAlert();
        } else {
          this.ErrorAlert();
        }
      });
      //console.log(order)
    } else {
      console.log('invalid form');
    }
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
