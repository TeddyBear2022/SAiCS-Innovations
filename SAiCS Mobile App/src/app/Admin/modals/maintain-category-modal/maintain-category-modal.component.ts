import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { FAQ } from 'src/app/Models/FAQ';
import { FAQCategory } from 'src/app/Models/FAQCategory';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-maintain-category-modal',
  templateUrl: './maintain-category-modal.component.html',
  styleUrls: ['./maintain-category-modal.component.scss'],
})
export class MaintainCategoryModalComponent implements OnInit {

  constructor(private modal: ModalController, private api:ApiService, private alert:AlertController, private popoverController: PopoverController) { }


  category:FormGroup
  newcategory:any
  categories=[]
  error:boolean = false
  typeSelected:boolean= false

  //next
  FAQs = []
  // FaqCategory = []

  ngOnInit() {
    this.category = new FormGroup({
      category: new FormControl(),
      faqType: new FormControl()
    })
  }
  ionViewWillEnter(){
    this.api.GetFAQategory().subscribe(data => {
      this.categories = data
      console.log(data)
    })

    this.api.GetAllFAQS().subscribe(data=> {
      this.FAQs = data
      console.log(this.FAQs)
    })
  }

  FAQType(){
    this.typeSelected = true
    for(var category of this.FAQs){
      if(category.faqtypeId == this.category.get(['faqType']).value){
        this.categories = category.faqcategories
      }
    }
  }

  dissmissModeal(){
    this.modal.dismiss();
  }
  DeleteCategory(category:any){
    let deleteCategory:FAQCategory = new FAQCategory();
    deleteCategory.FaqcategoryId = category.faqcategoryId
    deleteCategory.CategoryName = category.categoryName
   this.confirm(deleteCategory)
   // console.log(deleteCategory)
  }

  async confirm(deleteFAQ:FAQCategory) {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      message: 'Are you sure you want to delete this Category?',
      buttons: [{text: 'Confirm',
      cssClass: 'Confirm',
      handler: ()=> {
        //if confirm clicked
        console.log(deleteFAQ)
        this.api.DeleteFAQCategory(deleteFAQ.FaqcategoryId).subscribe(data =>{
          if(data == true){
            this.SuccessDeleted()
          }
          
          console.log(data)
        })
      }},{text: "Cancel",
      cssClass: 'Cancel',
      handler: ()=>

      this.close()
    }]
    });
    await alert.present()
  }

  close()
    {
      this.popoverController.dismiss();
    }
    
  CreateCategory(){
    if(this.category.get('category').value !=null){
      this.error = false

      let newCategory = new FAQCategory()
      newCategory.CategoryName = this.category.get('category').value
      newCategory.FaqTypeId= this.category.get(['faqType']).value
      this.api.CreateFAQCategory(newCategory).subscribe(data =>
        {
          if(data == true){
            this.SuccessCreated()
          }
          
        })
    //  console.log(newCategory)
    }
    else{
      console.log('Invalid')
      this.error = true
    }
    
  }
  async SuccessDeleted() {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      header: 'Success',
      // subHeader: 'Subtitle',
      message: 'Category Has been successfully deleted',
      buttons: [{text: 'Ok', handler: ()=> {
        this.modal.dismiss();
        window.location.reload() 
      }
    }]
    });
    await alert.present();
  }

  async SuccessCreated() {
    const alert = await this.alert.create({
      cssClass: 'messageAlert',
      header: 'Success',
      // subHeader: 'Subtitle',
      message: 'Category has been successfully created',
      buttons: [{text: 'Ok', handler: ()=> {
        this.modal.dismiss();
         
      }
    }]
    });
    await alert.present();
  }
}
