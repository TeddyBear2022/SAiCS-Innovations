import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-faq-modal',
  templateUrl: './update-faq-modal.component.html',
  styleUrls: ['./update-faq-modal.component.scss'],
})
export class UpdateFaqModalComponent implements OnInit {

  //Variable
  FAQ:FormGroup
  dbCategories = []
  updateFAQs;
  faqs
  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController, private popoverController:PopoverController) { }

  ngOnInit() {
    console.log(this.faqs)
    this.FAQ = new FormGroup({
      question: new FormControl(this.updateFAQs.faqquestion, Validators.required),
      answer: new FormControl(this.updateFAQs.faqanswers, Validators.required)
    })
  }

  ionViewWillEnter(){
    //get data from other place
    // this.api.GetFAQategory().subscribe(data => {
    //   this.dbCategories = data
    //   console.log(data)
    // })

    console.log(this.updateFAQs)
  }

  //Close Modal
  dissmissModeal(){
    this.modal.dismiss({updatedfaqs: this.faqs});
    // this.alert.dismiss()
    // this.close()
    // console.log("close")
  }

  updateFAQ(){
    if(this.FAQ.valid){
    this.confirm()
    console.log('open');
    
    }
    else{
      console.log("Invalid form")
    } 
  }

   //Are you sure? (confirmation message) 
   async confirm() {
    console.log("opened");
    
   const alert = await this.alert.create({
    //  header: 'Update',
     cssClass: 'messageAlert',
     message: 'Are you sure you want to update this FAQ?',
     buttons: [{text: 'Confirm',
     cssClass: 'Confirm',
     handler: ()=> {
       let apiUpdateFAQ:FAQ = new FAQ();
       apiUpdateFAQ.faqid = this.updateFAQs.faqid
       apiUpdateFAQ.faqcategoryId = this.updateFAQs.faqcategoryId
       apiUpdateFAQ.faqtypeId = this.updateFAQs.faqtypeId
       apiUpdateFAQ.faqanswers = this.FAQ.get('answer').value
       apiUpdateFAQ.faqquestion = this.FAQ.get('question').value
       
       this.api.UpdateFAQ(apiUpdateFAQ).subscribe(data =>{
         if(data == true){
          this.api.GetAllFAQS().subscribe(data=> {
            this.faqs = data
            console.log(this.faqs)
            this.dissmissModeal()
            this.Success()
          })
         }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
       },(response: HttpErrorResponse) => {
        
        if (response.status === 404) {
          this.dissmissModeal()
           this.UnSuccess()
        }
        if (response.status === 500){
          this.dissmissModeal()
           this.UnSuccess()
        }
        if (response.status === 400){
          this.dissmissModeal()
           this.UnSuccess()
        }
        
      })
     }},
     {text: "Cancel",
     cssClass: 'Cancel',
     handler: ()=>{
     console.log('close')
      alert.dismiss()
     //  this.close()
     }
   }]
   });

   await alert.present();
 }

  //Close Alert
  close()
  {
    this.popoverController.dismiss();
  }

  //Successfully updated
  async Success() {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      header: 'Successful',
      // subHeader: 'Subtitle',
      message: 'FAQ Has been successfully updated',
      buttons: [{text: 'Ok', handler: ()=> {
      // window.location.reload() 
      }
    }]
    });
    await alert.present();
  }

  //Unsuccessfully updated 
   async UnSuccess() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Unsuccessfull',
      // subHeader: 'Subtitle',
      message: 'FAQ was not updated',
      buttons: [{text: 'Ok', handler: ()=> {
      // this.close()
      alert.dismiss()
      }
    }]
    });
    await alert.present();
  }

}
