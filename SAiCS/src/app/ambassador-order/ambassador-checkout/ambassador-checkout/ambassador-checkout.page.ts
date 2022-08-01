import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Address } from 'src/app/Models/Address';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-ambassador-checkout',
  templateUrl: './ambassador-checkout.page.html',
  styleUrls: ['./ambassador-checkout.page.scss'],
})
export class AmbassadorCheckoutPage implements OnInit {
  deliveryOption=false
  newAddress: FormGroup
  OdrSmry: any;
  countries: any;
  constructor(public alert: AlertController, private api: ApiService,  private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.OdrSmry = JSON.parse(localStorage.getItem('checkout'))
    this.GetCountries()
    this.newAddress = this.fb.group({
      address: ['', [Validators.required]],
      city:['', [Validators.required]],
      postalCode:['', [Validators.required]],
      phone:['', [Validators.required, Validators.min(10)]],
      country: ['', [Validators.required]]
    });
  }

  toggleValue()
 {
  if (this.deliveryOption == true) this.OdrSmry.totalCost += 200;
  else this.OdrSmry.totalCost -= 200;
 } 
 
 GetCountries()
 {
  this.api.getCountrys().subscribe(data =>{
    this.countries = data
    console.log(this.countries);
    
  })
 }

 OnSubmit()
 {
  if(this.newAddress.valid)
  {
    let address = {} as Address;
    address.Address = this.newAddress.value.address
    address.CountryID = this.newAddress.value.country
    address.City = this.newAddress.value.city
    address.PostalCode = this.newAddress.value.postalCode
    address.RecipientNumber = this.newAddress.value.phone
    address.UserID = 1 //local storage things 

    this.api.NewAddress(address).subscribe();
    this.router.navigate(['/ambassador-checkout-ii'])
  }
  else
  {
    console.log("Invalid Form");
    
  }
  
  
 }

}
 
