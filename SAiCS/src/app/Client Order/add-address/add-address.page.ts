import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Style } from '@capacitor/status-bar';
import { AlertController, MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Address } from 'src/app/Models/Address';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  deliveryOption = false;
  SelectedDel;
  deliveryArr: any;
  SubTotal;
  newAddress: FormGroup;
  isExisting: boolean = false;
  OdrSmry: any;
  countries: any;
  provinces: any;
  session: any;
  username;

  constructor(
    public popoverController: PopoverController,
    public alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private tmpStorage: TemporaryStorage,
    public alertController: AlertController,
    private menu: MenuController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.deliveryOption = this.OdrSmry.deliveryOption;
    this.GetCountries();
    this.GetDelOptions();
    this.newAddress = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      phone: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(12), Validators.min(0)]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
    });
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

    this.api.GetCountries().subscribe(data => {
      this.countries = data
      console.log(this.countries);
      
    });
  }

  OnSubmit() {
    if (this.newAddress.valid) {
      let address = {} as Address;
      address.Address1 = this.newAddress.value.address;
      address.CountryID = this.newAddress.value.country;
      address.City = this.newAddress.value.city;
      address.PostalCode = this.newAddress.value.postalCode;
      address.RecipientNumber = this.newAddress.value.phone;
      address.ProvinceId = this.newAddress.value.province;
      address.UserID = this.session[0].id;

      this.api.NewAddress(address).subscribe((res) => {
        console.log(res.body);
        if(res.body == "Exists")
        {
          this.ErrorAlert()
        }
        else{this.router.navigate(['/client-checkout']); this.newAddress.reset()}


      });
      
    } else {
      console.log('Invalid Form');
    }
  }

  async ErrorAlert() {
    const alert = await this.alert.create({
      header: 'Invalid Form',
      message: "Address Already Exists",
      buttons: [{ text: 'OK' }],
    });

    await alert.present();
  }

  Return() {
    localStorage.removeItem('EditAddressId');
    history.back()
    //this.router.navigate(['/ambassador-checkout-ii']);
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
