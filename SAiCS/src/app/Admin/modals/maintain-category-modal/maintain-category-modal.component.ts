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
  ngOnInit() {
    this.category = new FormGroup({
      category: new FormControl()
    })
  }
  ionViewWillEnter(){
    this.api.GetFAQategory().subscribe(data => {
      this.categories = data
      console.log(data)
    })
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
      header: 'Delete',
      message: 'Are you sure you want to delete this Category?',
      buttons: [{text: 'Confirm', handler: ()=> {
        //if confirm clicked
        console.log(deleteFAQ)
        this.api.DeleteFAQCategory(deleteFAQ).subscribe(data =>{
          console.log(data)
        })
      }},{text: "Cancel", handler: ()=>

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
      this.api.CreateFAQCategory(newCategory).subscribe(data =>
        {
          console.log(data)
        })
    //  console.log(newCategory)
    }
    else{
      console.log('Invalid')
      this.error = true
    }
    
  }
}
