import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CreateProductModalComponent } from '../create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  products = []
  productTypes = []

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, 
  private modalCtrl: ModalController,
  public alertController: AlertController) { }

  ngOnInit() {
    this.GetProducts()
    this.GetProductTypes()
  }

//Get products
GetProducts()
{
 this.api.GetProducts().subscribe(data => {
   this.products = data; 
   console.log("Retrieved products");
   
  })
}
  
  //product categories
  GetProductTypes()
  {
    this.api.GetProductTypes().subscribe(data => {
      this.productTypes = data; 
      console.log("Retrieved product types");
      
     })
  }

//create product
 async createProduct()
{
 const modal = await this.modalCtrl.create({
    component: CreateProductModalComponent,
    id: 'createProductClass',
    
  });

  await modal.present();
}

//Update product
async updateProduct(name)
{
  
 const modal = await this.modalCtrl.create({
    component: UpdateProductModalComponent,
    componentProps: {
     existingProduct: name
    }
  });
  await modal.present();
}

//Delete product
async DeleteProduct(id: number) {
  const alert = await this.alertController.create({
    cssClass: 'messageAlert',
    message: 'Are you sure you would like to permanently remove this product? ',
    buttons: [
      {
        text: 'Confirm',
        cssClass: 'Confirm',
        handler: () => {
          this.api.DeleteProduct(id).subscribe(() => console.log("deleted successfully"))
          console.log('Confirm Ok');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'Cancel',
        handler: () => {
          
          console.log('Confirm Cancel');
        }
      }
    ]
  });

  await alert.present();
}

  //Profile popover
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
}
