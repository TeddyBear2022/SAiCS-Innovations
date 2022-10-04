import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
 //Variables
 AmbassadorFeedback = [];
 ProductFeedback = [];
 session: any;
 select = new FormControl();
 username;
 feedbackOpt: string = 'agent'

 constructor(
   private alert: AlertController,
   private api: ApiService,
   private tmpStorage: TemporaryStorage,
 ) {}

 ngOnInit() {
   this.username = localStorage.getItem('UserName');
   this.session = this.tmpStorage.getSessioninfo();
   this.select.setValue('');
   this.GetProductFeedback()
   this.GetAmbassadorFeedback()
 }

 ionViewWillEnter() {
  console.log('ionViewDidEnter');
   this.select.setValue('');
   this.GetProductFeedback();
   this.GetAmbassadorFeedback();
 }

 


 async GetAmbassadorFeedback() {
   await this.api
     .GetAmbassadorFeedback(this.session[0].id)
     .subscribe((data) => {
       this.AmbassadorFeedback = data;
       console.log(this.AmbassadorFeedback);
     });
 }

 GetProductFeedback() {
   this.api.GetProductFeedback(this.session[0].id).subscribe((data) => {
     this.ProductFeedback = data;
     console.log(this.ProductFeedback);
   });
 }

 DeleteFeedback(id: number, feedbackType: number) {
   this.api.DeleteFeedback(id).subscribe((data) => {
     this.GetProductFeedback();
     this.GetAmbassadorFeedback();
     console.log(data);
   });
 }

 PresentFeeback(value) {
   let present = value;

   if (present == 1) {
     this.GetProductFeedback();
   } else if (present == 2) {
     this.GetAmbassadorFeedback();
   }
 }

 ChooseOption(option: string)
  {
     this.feedbackOpt = option;
     console.log(this.feedbackOpt);
     
  }

 async ErrorAlert(message: string) {
   const alert = await this.alert.create({
     header: 'Invalid Form',
     message: message,
     buttons: [{ text: 'OK' }],
   });

   await alert.present();
 }

}
