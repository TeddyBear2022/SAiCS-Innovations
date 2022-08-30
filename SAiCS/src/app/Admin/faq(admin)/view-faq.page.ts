import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AlertController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AddFAQModalComponent } from '../modals/add-faq-modal/add-faq-modal.component';
// import { FAQAddModalPage } from '../modals/faq-add-modal/faq-add-modal.page';
import { MaintainCategoryModalComponent } from '../modals/maintain-category-modal/maintain-category-modal.component';
import { UpdateFaqModalComponent } from '../modals/update-faq-modal/update-faq-modal.component';
// import{FAQCategory} from 'src/app/Models/FAQCategory'

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.page.html',
  styleUrls: ['./view-faq.page.scss'],
})
export class ViewFaqPage implements OnInit {

  constructor(public popoverController: PopoverController, 
    private modal: ModalController, 
    private api:ApiService, 
    private alert:AlertController,
    private menu:MenuController
    ) { }
  //Variables
   FAQs = []; // part of fixed
   productFAQs=[];
   accountFAQs=[];
   deliveryFAQs=[];
   faqType:NgModel;
   category:NgModel;
   chosenCategory:any;
   chosenfaqtype:any;
   dbCategories=[];
   filter:boolean = false // part of fixed
   showCategory


   //new faq method
   faqCategory =[]
   filteredFAQS = []
   categoryHeading
   testingFAQS= "modal passing data"

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    // this.menu.open('admin-menu')

  }
  
   // Show Profile options when icon on right of navbar clicked function
   async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

   ionViewWillEnter(){
    this.api.GetAllFAQS().subscribe(data=> {
      
      this.FAQs = data
      console.log(this.FAQs)
    
    })
   }

   ionViewDidEnter(){
     console.log("new info")
   }
   //Create FAQ Modal
   async createFAQ(){
     console.log("Open faq modal")
     const modal = await this.modal.create({
       component: AddFAQModalComponent,
       componentProps: {testingFAQ: this.FAQs}
     });
     modal.onDidDismiss().then((data) => {
      console.log(data.data.addedFaq)
      
      //make current list equal to the one sent from the modal
      this.FAQs = data.data.addedFaq
      
    })
     await modal.present();
   }
   
   //Maintain FAQ categories
   async MaintainCategory(){
     console.log("Open maintain category model");
     const modal = await this.modal.create({
       component: MaintainCategoryModalComponent,
       keyboardClose :  false
     });
     
     await modal.present();
   }

  //Maintain FAQ categories
  async UpdateFAQ(faq:FAQ){
    console.log("Open update FAQ model");
    const modal = await this.modal.create({
      component: UpdateFaqModalComponent,
      componentProps: {
        updateFAQs: faq,
        faqs:this.FAQs
      },
      keyboardClose :  false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data.data.updatedfaqs)
      
      //make current list equal to the one sent from the modal
      this.FAQs = data.data.updatedfaqs
      
    })
    
    await modal.present();
  }
   
   FAQType(){
     this.chosenfaqtype = this.faqType   
    if(this.faqType != null){
      this.filter = true
      for(var category of this.FAQs){
        if(category.faqtypeId == this.faqType){
          this.faqCategory = category.faqcategories
        }
      }
    }
   else{
    this.filter = false
    console.log(this.filter)
   }
  }

  FAQCategory(){
  this.chosenCategory = this.category;
  if(this.category != null && this.faqType != null){
    this.filter = true

    for(var filterfaqs of this.faqCategory){
      if(filterfaqs.faqcategoryId == this.category){
        this.filteredFAQS = filterfaqs.faqs
      }
    }
   var index = this.faqCategory.findIndex(x=> x.faqcategoryId == this.category)
   this.categoryHeading = this.faqCategory[index].categoryName
  }
 else{
  this.filter = false
  console.log(this.filter)
 }
  }

  DeleteFAQ(thisFAQs:any){
    this.confirm(thisFAQs)
  }

  close()
  {
    this.popoverController.dismiss();
  }

  async Success() {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      message: 'FAQ Has been successfully deleted',
      buttons: [{text: 'Ok', handler: ()=> {
      window.location.reload() 
      }
    }]
    });
    await alert.present();
  }

  //Are you sure 
  async confirm(deleteFAQS:FAQ) {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      message: 'Are you sure you want to delete this FAQ?',
      buttons: [{text: 'Confirm',
      cssClass: 'Confirm',
      handler: ()=> {
        let deleteFAQ:FAQ = new FAQ()
        deleteFAQ.faqanswers = deleteFAQS.faqanswers
        deleteFAQ.faqcategoryId = deleteFAQS.faqcategoryId
        deleteFAQ.faqquestion = deleteFAQS.faqquestion
        deleteFAQ.faqtypeId = deleteFAQS.faqtypeId
        deleteFAQ.faqid = deleteFAQS.faqid
        console.log(deleteFAQ)
        this.api.DeleteFAQ(deleteFAQS.faqid).subscribe(data => {
          if(data==true){
            this.Success()
          }
          else{
            console.log('error:'+ data)
          }
        })
      }},{text: "Cancel",
      cssClass: 'Cancel',
      handler: ()=>
      alert.dismiss()
    }]
    });

    await alert.present();
  }

}
