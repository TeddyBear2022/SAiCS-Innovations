import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/Models/Address';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  
  addressId:any 
  userAddress: any;
  session: any;
  newAddress: FormGroup
  setData: any;
  countries: any;
  provinces: any;

  
  constructor(private api: ApiService,private tmpStorage: TemporaryStorage, 
    private route: Router, private fb: FormBuilder, private alert:AlertController) { }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo();
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
        else{history.back(); this.newAddress.reset()}


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

  GetCountries()
  {
 
   this.api.GetProvinces().subscribe(data => {
     this.provinces = data
   })

   this.api.GetCountries().subscribe(data => {
    this.countries = data
    console.log(this.countries);
    
  })
  }

  Return()
  {
    history.back()
  }

}
