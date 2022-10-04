import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Address } from 'src/app/Models/Address';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  addressId:any 
  userAddress: any;
  session: any;
  newAddress: FormGroup
  setData: any;
  countries: any;
  provinces: any;
  existingAddress: number;


  constructor(private api: ApiService,private tmpStorage: TemporaryStorage, 
    private route: Router, private fb: FormBuilder, private alert:AlertController) {
      this.existingAddress =  JSON.parse(localStorage.getItem('EditAddressId'));
     }

  ngOnInit() {
    this.addressId = JSON.parse(localStorage.getItem('AddressId'))
    this.session = this.tmpStorage.getSessioninfo();
    this.GetAddress();
    this.GetCountries()
    this.newAddress = this.fb.group({
      address: new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      postalCode:new FormControl('', [Validators.required]),
      phone:['', [Validators.required,  Validators.minLength(10), Validators.maxLength(12), Validators.min(0)]],
      country: new FormControl('', [Validators.required]),
      province:new FormControl('', [Validators.required])
    });
    this.GetSecondaryAddressById(this.existingAddress)
  }

  GetSecondaryAddressById(id: number)
  {
    this.api.GetSecondaryAddressById(id).subscribe(data =>
      {
        this.setData = data;
        console.log(this.setData);
        this.newAddress.controls['address'].setValue(this.setData.address)
        this.newAddress.controls['city'].setValue(this.setData.city)
        this.newAddress.controls['postalCode'].setValue(this.setData.postalCode)
        this.newAddress.controls['phone'].setValue(this.setData.phone)
        this.newAddress.controls['country'].setValue(this.setData.countryId)
        this.newAddress.controls['province'].setValue(this.setData.provinceId)


      })
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
    localStorage.removeItem('EditAddressId')
    history.back()
  }

  GetAddress() {
    this.api.GetAddress(this.session[0].id).subscribe((data) => {
      this.userAddress = data;
      this.userAddress = this.userAddress.find(x => x.id === this.addressId)
      console.log(this.userAddress);
    });
  }

  DeleteAddress(id: number) {
    this.api.DeleteSecondaryAddress(id).subscribe((res) => {
      if(res.body == "Deleted")
      {
        
        this.Notif("Address deleted Sucessfully deleted") 
      }
       else
       {
          this.Notif(res.body) 
          
       }
    });
  }

  OnSubmit()
  {
    if(this.newAddress.valid)
    {
      let address = {} as Address;
      address.AddressID = this.existingAddress
      address.Address1 = this.newAddress.value.address
      address.CountryID = this.newAddress.value.country
      address.City = this.newAddress.value.city
      address.PostalCode = this.newAddress.value.postalCode
      address.RecipientNumber = this.newAddress.value.phone
      address.ProvinceId = this.newAddress.value.province
      address.UserID = this.session[0].id
  
      this.api.EditSecondaryAddress(address).subscribe((res) => {
        console.log(res.body);

        if(res.body == "true")
        {
          localStorage.removeItem('EditAddressId')
          this.Notif("Address Has been Updated Sucessfully")
          history.back()
        }
        else
        {
          this.Notif("OOps! Failed to Updated. Please Try Again Later")
        }
        
      });
    }
    else
    {
      console.log("Invalid Form");
      
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

}
