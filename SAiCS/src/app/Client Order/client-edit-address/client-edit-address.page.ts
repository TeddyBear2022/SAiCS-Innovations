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
} from '@ionic/angular';
import { Address } from 'src/app/Models/Address';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-client-edit-address',
  templateUrl: './client-edit-address.page.html',
  styleUrls: ['./client-edit-address.page.scss'],
})
export class ClientEditAddressPage implements OnInit {
  deliveryOption = false;
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
    private menu: MenuController,
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
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.GetCountries();
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

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
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

  toggleValue() {
    var deliverValue = JSON.parse(localStorage.getItem('checkout'));
    if (this.deliveryOption == true) {
      this.OdrSmry.totalCost += 200;
      deliverValue.deliveryOption = true;
    } else {
      this.OdrSmry.totalCost -= 200;
      deliverValue.deliveryOption = false;
    }

    localStorage.setItem('checkout', JSON.stringify(deliverValue));
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
          this.router.navigate(['/client-checkout']);
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

  Return() {
    localStorage.removeItem('EditAddressId');
    this.router.navigate(['/ambassador-checkout-ii']);
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

  //Profile popover
  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
