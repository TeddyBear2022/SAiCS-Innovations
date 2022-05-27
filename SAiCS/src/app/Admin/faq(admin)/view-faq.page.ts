import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AddFAQModalComponent } from '../modals/add-faq-modal/add-faq-modal.component';
// import { FAQAddModalPage } from '../modals/faq-add-modal/faq-add-modal.page';
import { MaintainCategoryModalComponent } from '../modals/maintain-category-modal/maintain-category-modal.component';
import { UpdateFaqModalComponent } from '../modals/update-faq-modal/update-faq-modal.component';


@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.page.html',
  styleUrls: ['./view-faq.page.scss'],
})
export class ViewFaqPage implements OnInit {

  constructor(public popoverController: PopoverController, private modal: ModalController, private api:ApiService, private alert:AlertController) { }
  //Variables
   FAQs = [];
   productFAQs=[];
   accountFAQs=[];
   deliveryFAQs=[];
   faqType:NgModel;
   category:NgModel;
   chosenCategory:any;
   chosenfaqtype:any;
   dbCategories=[];
   filter:boolean = false
   showCategory

  ngOnInit() {
  //  this.api.GetAllFAQS().subscribe(data=> {
  //    console.log(data)
  //   this.FAQs = data})

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
  //     this.api.GetFAQategory().subscribe(data =>
  //       {
  //         this.dbCategory = data
  //         console.log(data)
  //       })
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
      console.log(data)
      this.FAQs = data})

    this.api.GetProductFAQ().subscribe(data =>
      {
        this.productFAQs = data
        //console.log(data)
      })

    this.api.GetAccountFAQ().subscribe(data =>
      {
        this.accountFAQs = data
        //console.log(data)
      })
      
    this.api.GetDeliveryFAQ().subscribe(data =>
      {
        this.deliveryFAQs = data
        //console.log(data)
      })
      this.api.GetFAQategory().subscribe(data =>
        {
          this.dbCategories = data
          console.log(data)
        })
   }

   ionViewDidEnter(){
     console.log("new info")
   }
   //Create FAQ Modal
   async createFAQ(){
     console.log("Open faq modal")
     const modal = await this.modal.create({
       component: AddFAQModalComponent
     });
     modal.onDidDismiss().then(() => {
      //  If all else fails
      // window.location.reload() 
      // let addFAQ = data.data
      // if(addFAQ.faqcategoryId == 3){
      //   this.deliveryFAQs.push(addFAQ)
      //   console.log("add delvery faq")
      // }
      // if(addFAQ.faqcategoryId == 2){
      //   this.productFAQs.push(addFAQ)
      //   console.log("add product faq")
      // }
      // if(addFAQ.faqcategoryId == 1){
      //   // addFAQ.faqid = addFAQ.faqid
      //   this.accountFAQs.push(addFAQ)
      //   console.log("add account faq")
      // }
      // console.log(addFAQ)
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
      },
      keyboardClose :  false
    });
    
    await modal.present();
  }
   
   FAQType(){
     this.chosenfaqtype = this.faqType     
     if(this.chosenCategory != null && this.chosenfaqtype != null){
      this.filter = true
      console.log(this.filter)
    }
   else{
    this.filter = false
    console.log(this.filter)
   }
   console.log(this.chosenfaqtype);
     
  }

  FAQCategory(){
    this.chosenCategory = this.category;

    if(this.chosenCategory != null && this.chosenfaqtype != null){
      this.filter = true
      this.showCategory = this.dbCategories[this.chosenCategory-1]
      console.log(this.showCategory)
      console.log(this.filter)
    }
   else{
    this.filter = false
    console.log(this.filter)
   }
    console.log(this.chosenCategory)
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
      cssClass: 'my-custom-class',
      header: 'Success',
      // subHeader: 'Subtitle',
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
      header: 'Delete',
      message: 'Are you sure you want to delete this FAQ?',
      buttons: [{text: 'Confirm', handler: ()=> {
        let deleteFAQ:FAQ = new FAQ()
        deleteFAQ.faqanswers = deleteFAQS.faqanswers
        deleteFAQ.faqcategoryId = deleteFAQS.faqcategoryId
        deleteFAQ.faqquestion = deleteFAQS.faqquestion
        deleteFAQ.faqtypeId = deleteFAQS.faqtypeId
        deleteFAQ.faqid = deleteFAQS.faqid
        console.log(deleteFAQ)
        this.api.DeleteFAQ(deleteFAQS).subscribe(data => {
          if(data==true){
            this.Success()
          }
          else{
            console.log('error:'+ data)
          }
        })
      }},{text: "Cancel", handler: ()=>
      // this.close()
      // console.log('close'),
      alert.dismiss()
    }]
    });

    await alert.present();
  }

}
