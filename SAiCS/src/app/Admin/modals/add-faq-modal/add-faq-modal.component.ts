import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-faq-modal',
  templateUrl: './add-faq-modal.component.html',
  styleUrls: ['./add-faq-modal.component.scss'],
})
export class AddFAQModalComponent implements OnInit {

  FAQ:FormGroup
  FAQs = [];
  productFAQs=[];
  accountFAQs=[];
  deliveryFAQs=[];
  dbCategories = []
  lastFAQ=[]
  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController) { }

  ngOnInit() {
    this.FAQ = new FormGroup({
      faqtype: new FormControl(null, Validators.required),
      category: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    })
  }

  ionViewWillEnter(){
    this.api.GetFAQategory().subscribe(data => {
      this.dbCategories = data
      console.log(data)
    })
    // this.api.GetAllFAQS().subscribe(data => {
    //   this.lastFAQ = data
    //   console.log(this.lastFAQ[this.lastFAQ.length-1].faqid)
    // })
  }
  // ionViewDidLeave(){
  //   this.api.GetAllFAQS().subscribe(data=> {
  //     console.log(data)
  //     this.FAQs = data})

  //   this.api.GetProductFAQ().subscribe(data =>
  //     {
  //       this.productFAQs = data
  //       console.log(data)
  //     })

  //   this.api.GetAccountFAQ().subscribe(data =>
  //     {
  //       this.accountFAQs = data
  //       console.log(data)
  //     })
      
  //   this.api.GetDeliveryFAQ().subscribe(data =>
  //     {
  //       this.deliveryFAQs = data
  //       console.log(data)
  //     })
  // }

  dissmissModeal(){
    this.modal.dismiss();
    
  }
  // sendDataBack(addFAQ:FAQ){
  //   this.modal.dismiss(addFAQ);
  // }

  createFAQ(){
    //valid form
    if(this.FAQ.valid){
   let newFAQ:FAQ = new FAQ();
    newFAQ.faqanswers = this.FAQ.get('answer').value;
    newFAQ.faqquestion = this.FAQ.get('question').value;
    newFAQ.faqcategoryId = this.FAQ.get('category').value;
    newFAQ.faqtypeId = this.FAQ.get('faqtype').value;
    // console.log(newFAQ)
    this.api.CreateFAQ(newFAQ).subscribe(data => {
      if(data ==true){
        // newFAQ.faqid =this.lastFAQ[this.lastFAQ.length-1].faqid +1
        // this.sendDataBack(newFAQ)
        this.dissmissModeal()
        this.Success()
        // console.log('Success')
      }
      else{
        console.log('Unsuccessful')
      }

    })
    
  }
  //Invalid Form
  else{
    console.log('Invalid form')
  }

  }

  async Success() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      // subHeader: 'Subtitle',
      message: 'FAQ Has been successfully created',
      buttons: [{text: 'Ok', handler: ()=> {
        window.location.reload() 
      }
    }]
    });
    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
}
