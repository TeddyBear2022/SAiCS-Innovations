import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Address } from 'src/app/Models/Address';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  deliveryOption = false;
  SelectedDel;
  deliveryArr: any;
  SubTotal;
  newAddress: FormGroup;
  OdrSmry: any;
  countries: any;
  provinces: any;
  setData: any;
  existingAddress: number;
  session: any;
  username;

  constructor(
    public popoverController: PopoverController,
    public alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private tmpStorage: TemporaryStorage,
    private cartService: CartService
  ) {
    this.existingAddress = JSON.parse(localStorage.getItem('EditAddressId'));
  }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.deliveryOption = this.OdrSmry.deliveryOption;
    this.GetCountries();
    this.GetDelOptions();
    this.newAddress = this.fb.group({
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.min(0),
        ],
      ],
      country: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
    });

    this.GetSecondaryAddressById(this.existingAddress);
    this.username = localStorage.getItem('UserName');
  }

  ionViewDidEnter() {
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.GetDelOptions();
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
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

  toggleValue()
  {
    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    deliverValue.deliveryOption = this.deliveryOption
    localStorage.setItem('checkout', JSON.stringify(deliverValue));
  }

  GetCountries() {
    this.api.GetProvinces().subscribe((data) => {
      this.provinces = data;
    });

    this.api.GetCountries().subscribe((data) => {
      this.countries = data;
      console.log(this.countries);
    });
  }

  onSelectChange(event) {
    let value = event.target.value;
    this.SelectedDel = value;
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

  GetSecondaryAddressById(id: number) {
    this.api.GetSecondaryAddressById(id).subscribe((data) => {
      this.setData = data;
      console.log(this.setData);
      this.newAddress.controls['address'].setValue(this.setData.address);
      this.newAddress.controls['city'].setValue(this.setData.city);
      this.newAddress.controls['postalCode'].setValue(this.setData.postalCode);
      this.newAddress.controls['phone'].setValue(this.setData.phone);
      this.newAddress.controls['country'].setValue(this.setData.countryId);
      this.newAddress.controls['province'].setValue(this.setData.provinceId);
    });
  }

  OnSubmit() {
    if (this.newAddress.valid) {
      let address = {} as Address;
      address.AddressID = this.existingAddress;
      address.Address1 = this.newAddress.value.address;
      address.CountryID = this.newAddress.value.country;
      address.City = this.newAddress.value.city;
      address.PostalCode = this.newAddress.value.postalCode;
      address.RecipientNumber = this.newAddress.value.phone;
      address.ProvinceId = this.newAddress.value.province;
      address.UserID = this.session[0].id;

      this.api.EditSecondaryAddress(address).subscribe((res) => {
        console.log(res.body);

        if (res.body == 'true') {
          localStorage.removeItem('EditAddressId');
          this.router.navigate(['/ambassador-checkout-ii']);
        }
        else
        {
          this.Notif("Oops! Failed to update address. Please try again later")
        }

      });
    } else {
      console.log('Invalid Form');
    }
  }

  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{
      text: 'OK',
    handler: () =>{
      history.back()
    }
    }]
    });
  
    await alert.present();
    
  }

  Return() {
    localStorage.removeItem('EditAddressId');
    this.router.navigate(['/ambassador-checkout-ii']);
  }

  //Profile popover
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
