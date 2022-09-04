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

  //Variables
  FAQ:FormGroup
  FAQs = []; 
  faqCategory =[]
  filteredFAQS = []
  addedFAQ
  testingFAQ
  
  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController) { }

  ngOnInit() {
    console.log(this.testingFAQ)
    this.FAQ = new FormGroup({
      faqtype: new FormControl(null, Validators.required),
      category: new FormControl('', Validators.required),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    })
  }

  ionViewWillEnter(){
    this.api.GetAllFAQS().subscribe(data=> {
      this.FAQs = data
    })
  }

  FAQType(){
     for(var category of this.FAQs){
       if(category.faqtypeId == this.FAQ.get(['faqtype']).value){
         this.faqCategory = category.faqcategories
       }
     }
     console.log(this.faqCategory);
    
 }

 FAQCategory(){
  console.log(this.FAQ.get(['category']).value)
 }

  dissmissModeal(){
    this.modal.dismiss({addedFaq: this.addedFAQ});
    
  }

  createFAQ(){
    //valid form
    if(this.FAQ.valid){
   let newFAQ:FAQ = new FAQ();
    newFAQ.faqanswers = this.FAQ.get('answer').value;
    newFAQ.faqquestion = this.FAQ.get('question').value;
    newFAQ.faqcategoryId = this.FAQ.get('category').value;
    newFAQ.faqtypeId = this.FAQ.get('faqtype').value;
    
    this.api.CreateFAQ(newFAQ).subscribe(data => {
      if(data ==true){
        this.api.GetAllFAQS().subscribe(data=> {
          this.addedFAQ = data
          console.log(this.addedFAQ)
          this.dissmissModeal()
          this.Success()
        })
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
      cssClass: 'messageAlert',
      message: 'FAQ has been successfully created',
      buttons: [{text: 'Ok', handler: ()=> { 
      }
    }]
    });
    await alert.present();
  }
}
