import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-ambassador-checkout',
  templateUrl: './ambassador-checkout.page.html',
  styleUrls: ['./ambassador-checkout.page.scss'],
})
export class AmbassadorCheckoutPage implements OnInit {
  deliveryOption=false
  newAddress: FormGroup
  itemTotal=[]
  itemCount = 0
  totalCost = 0
  subtotal = 0
  discount = 0
  vat = 0
  constructor(public alert: AlertController, private api: ApiService,  private fb: FormBuilder) { }

  ngOnInit() {

    this.newAddress = this.fb.group({
      address: ['', [Validators.required]],
      city:['', [Validators.required]],
      postalCode:['', [Validators.required]],
      phone:['', [Validators.required, Validators.min(10)]]
    });
  }

  toggleValue()
 {
  if(this.deliveryOption == true)
  this.totalCost += 200
  else
  this.totalCost -= 200

  console.log(this.totalCost)
    return this.totalCost 
 } 
 
  async showAlert(){
    const alert = await this.alert.create({
      header: "Thank You For Your Order!",
      message: "At SAICS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintainable lifestyle with our top of the range and clinically tested products",
      buttons: [
        {
            text: "Back To Home"
        },
      ]
    });
    await alert.present()}

}


 
