import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { Address } from 'src/app/Models/Address';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  deliveryOption=false
  newAddress: FormGroup
  OdrSmry: any;
  countries: any;
  provinces: any;
  setData: any;
  existingAddress: number;
  session: any 

  constructor(public popoverController: PopoverController, public alert: AlertController,
     private api: ApiService,  private fb: FormBuilder,private router: Router, private tmpStorage:TemporaryStorage) {
      this.existingAddress =  JSON.parse(localStorage.getItem('EditAddressId'));
      }

  ngOnInit() {
    this.session = this.tmpStorage.getSessioninfo()
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'))
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

  toggleValue()
  {
   var deliverValue = JSON.parse(localStorage.getItem('checkout'))
   if (this.deliveryOption == true)
   {
     this.OdrSmry.totalCost += 200;
     deliverValue.deliveryOption = true;
 
   }
   else
   {
    this.OdrSmry.totalCost -= 200;
    deliverValue.deliveryOption = false;
   }
   
   localStorage.setItem('checkout', JSON.stringify(deliverValue))
  
  } 
  
  GetCountries()
  {
 
   this.api.GetProvinces().subscribe(data => {
     this.provinces = data
   })
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
          this.router.navigate(['/ambassador-checkout-ii'])
        }
        // if(res.body == true)
        // {

        // }
        
      });
      //this.router.navigate(['/ambassador-checkout-ii'])
    }
    else
    {
      console.log("Invalid Form");
      
    }
  }

  Return()
  {
    localStorage.removeItem('EditAddressId')
    this.router.navigate(['/ambassador-checkout-ii'])
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
