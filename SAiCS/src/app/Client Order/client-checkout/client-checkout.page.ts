import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController} from '@ionic/angular';
import { BankingDetailsComponent } from './banking-details/banking-details.component';
@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.page.html',
  styleUrls: ['./client-checkout.page.scss'],
})
export class ClientCheckoutPage implements OnInit {
   constructor(public alertController: AlertController, private modal: ModalController) { }

  ngOnInit() {
  }

  BankingDetails(){
    this.bankingdetails()
   }
  async bankingdetails()
  {
   const modals = await this.modal.create({
      component: BankingDetailsComponent,      
      cssClass:"small-modal",
    });
    modals.onDidDismiss().then(() => {
    
    })
    return await modals.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank You For Your Order!',
      message: 'At SAiCS we know the struggles many of us face everyday and that is why we are offering you the opportunity to take control of your health and start living a healthy and maintable lifestyle with our top of the range and clinically tested products!',
      buttons: [
        {
            text: 'Back to home'
        },
      ]
    });
    await alert.present();}
  }

