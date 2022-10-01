import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { CartItem } from 'src/app/Models/CartItem';
import { Checkout } from 'src/app/Models/ViewModels/Checkout';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-ambassador-checkout-ii',
  templateUrl: './ambassador-checkout-ii.page.html',
  styleUrls: ['./ambassador-checkout-ii.page.scss'],
})
export class AmbassadorCheckoutIiPage implements OnInit {
  selectedFile: any;
  userAddress: any;
  deliveryOption = false;
  checkout: FormGroup;
  OdrSmry: any;
  session: any
  isModalOpen = false;
  AgentAccount: any
  items: any = [];
  username;
  deliveryArr: any;
  SelectedDel;
  SubTotal;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    public popoverController: PopoverController, 
    private alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private tmpStorage:TemporaryStorage,
    private menu: MenuController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.menu.enable(true, 'ambassador-menu');
    this.GetAddress();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'))
    this.deliveryOption = this.OdrSmry.deliveryOption == true? true : false
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.username = localStorage.getItem('UserName');
    this.GetDelOptions();
    this.checkout = this.fb.group({
      address: ['', [Validators.required]],
      pdfFile:['', [Validators.required]]
    });
  }

  ionViewDidEnter() {
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
      return (this.SubTotal + parseInt(sp)) - this.OdrSmry.discount;
    } else {
      return this.SubTotal - this.OdrSmry.discount;
    }
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }

  onSelectChange(event) {
    let value = event.target.value;
    this.SelectedDel = value;

    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    deliverValue.delveryId = this.SelectedDel
    localStorage.setItem('checkout', JSON.stringify(deliverValue));
  }

  toggleValue()
  {
    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    deliverValue.deliveryOption = this.deliveryOption
    localStorage.setItem('checkout', JSON.stringify(deliverValue));
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

  GetAddress() {
    this.api.GetAddress(this.session[0].id).subscribe((data) => {
      this.userAddress = data;
      console.log(this.userAddress);
    });
  }

  onFileSelected(event) {
     let file = event.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
       let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
       if ((encoded.length % 4) > 0) {
         encoded += '='.repeat(4 - (encoded.length % 4));
       }
     this.selectedFile = encoded
     console.log("encoded successfully")
      }
    
  }

  EditAddress(id: number)
  {
    localStorage.setItem('EditAddressId', JSON.stringify(id))
    this.router.navigate(['./edit-address'])
  }

  DeleteAddress(id: number)
  {
    this.api.DeleteSecondaryAddress(id).subscribe(res => {
      if(res.body == "Deleted")
      {
        
        this.Notif("Address deleted Sucessfully deleted") 
        this.GetAddress();
      }
       else
       {
          this.Notif(res.body) 
          
       }
      
    })
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

      this.api.Checkout(order).subscribe((res) => {
        console.log(res.body);
        if (res.status === 200) {
          this.checkout.get('address').setValidators(Validators.required);
          this.checkout.get('address').updateValueAndValidity();
          this.api.OrderEmail(this.session[0].email, parseInt(res.body)).subscribe()
          this.api.AmbassaodorNotification(this.AgentAccount.email, parseInt(res.body)).subscribe()

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
              'itemCount': 0, 'discount': 0,
              'vat': 0, 'subtotal': 0, 'totalCost': 0, 'deliveryOption': 0}
              localStorage.setItem('checkout', JSON.stringify(orderdetails))
              localStorage.removeItem("cart_items");
            this.router.navigate(['/ambassador-landing-page'])
          }
        },
      ],
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

  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{
      text: 'OK'}]
    });
  
    await alert.present();
    
  }

  async ErrorAlert() {
    const alert = await this.alert.create({
      header: 'OOPS!',
      message: "Something went wrong during the processing of this order. Please try again!",
      buttons: [{ text: 'OK' }],
    });

    await alert.present();
  }

  //Profile popover
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
