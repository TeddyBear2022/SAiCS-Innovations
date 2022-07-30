import { Component, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header:'Thank You For Your Order!',
      message: 'At SAiCS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintable lifestyle with our top of the range and clinically tested products!',
      cssClass : 'ThankYouAlert',
      buttons: [
        {
            text: 'Back to home'
        },
      ]
    });
    await alert.present();}
}
