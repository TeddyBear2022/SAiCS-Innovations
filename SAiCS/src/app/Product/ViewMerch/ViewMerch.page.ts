import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CreateMerchModalComponent } from '../CreateMerchModal/CreateMerchModal.component';
import { UpdateMerchModalComponent } from '../UpdateMerchModal/UpdateMerchModal.component';

@Component({
  selector: 'app-view-merch',
  templateUrl: './ViewMerch.page.html',
  styleUrls: ['./ViewMerch.page.scss'],
})
export class ViewMerchPage implements OnInit {
  merch = []
  merchCat = [];
  merchCatOption = 'All'
  

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, 
  private modalCtrl: ModalController,
  public alertController: AlertController,
  public toastController: ToastController) { }

  ngOnInit() {
    this.GetAllMerch()
    this.GetMerchCat()
  }
  
  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
      console.log(this.merchCat);
    });
  }

//Get products
GetAllMerch()
{
  this.api.GetAllMerch().subscribe(data =>
    {
      this.merch = data
      console.log(this.merch);
    })
}
  

//create product
 async createProduct()
{
 const modal = await this.modalCtrl.create({
    component: CreateMerchModalComponent,
    id: 'createProductClass',
    
  });

  await modal.present();
}

//Update product
async updateProduct(id: number)
{
  
 const modal = await this.modalCtrl.create({
    component: UpdateMerchModalComponent,
    componentProps: {
     existingProduct: id
    }
  });
  await modal.present();
}

//Delete product
async DeleteMerch(id: number) {
  const alert = await this.alertController.create({
    cssClass: 'messageAlert',
    message: 'Are you sure you would like to permanently remove this product? ',
    buttons: [
      {
        text: 'Confirm',
        cssClass: 'Confirm',
        handler: () => {
          this.api.DeleteMerch(id).subscribe(() => console.log("deleted successfully"))
          this.presentToast()
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

//success alert
async presentToast() {
  const toast = await this.toastController.create({
    message: 'Successfully deleted Product',
    cssClass: 'successToaster',
    duration: 5000
  });
  toast.present(); 
  //window.location.reload() 
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
