import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ambassador-checkout',
  templateUrl: './ambassador-checkout.page.html',
  styleUrls: ['./ambassador-checkout.page.scss'],
})
export class AmbassadorCheckoutPage implements OnInit {

  constructor(public alert: AlertController, ) { }

  ngOnInit() {
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


 
