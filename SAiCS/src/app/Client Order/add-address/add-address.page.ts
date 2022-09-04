import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Style } from '@capacitor/status-bar';
import { AlertController, MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Address } from 'src/app/Models/Address';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  deliveryOption = false;
  newAddress: FormGroup;
  OdrSmry: any;
  countries: any;
  provinces: any;
  session: any;

  constructor(
    public popoverController: PopoverController,
    public alert: AlertController,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private tmpStorage: TemporaryStorage,
    public alertController: AlertController,
    private menu: MenuController,
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'client-menu');
    this.session = this.tmpStorage.getSessioninfo();
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'));
    this.GetCountries();
    this.newAddress = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      phone: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(12), Validators.min(0)]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
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

  GetCountries() {
    this.api.GetProvinces().subscribe((data) => {
      this.provinces = data;
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
      });
      this.router.navigate(['/client-checkout']);
    } else {
      console.log('Invalid Form');
    }
  }

  async presentPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
    });
    return await popover.present();
  }
}
