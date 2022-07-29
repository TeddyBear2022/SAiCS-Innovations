import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ambassador-checkout-ii',
  templateUrl: './ambassador-checkout-ii.page.html',
  styleUrls: ['./ambassador-checkout-ii.page.scss'],
})
export class AmbassadorCheckoutIiPage implements OnInit {

  constructor(private alert:AlertController) { }

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


