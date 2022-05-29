import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CreatePackageModalComponent } from '../create-package-modal/create-package-modal.component';
import { UpdatePackageModalComponent } from '../update-package-modal/update-package-modal.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.page.html',
  styleUrls: ['./view-package.page.scss'],
})
export class ViewPackagePage implements OnInit {
  packages = []
  packageTypes = []

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, 
  private modalCtrl: ModalController,
  public alertController: AlertController,
  public toastController: ToastController) { }

  ngOnInit() {
    this.GetPackages()
    this.GetPackageTypes()
  }

//Get products
GetPackages()
{
 this.api.GetPackages().subscribe(data => {
   this.packages = data; 
   console.log("Retrieved products");
   
  })
}

 //product categories
 GetPackageTypes()
 {
   this.api.GetProductTypes().subscribe(data => {
     this.packageTypes = data; 
     console.log("Retrieved product types");
     
    })
 }

 async createPackage()
 {
  const modal = await this.modalCtrl.create({
     component: CreatePackageModalComponent,
     id: 'createProductClass'
     
   });
 
   await modal.present();
 }

 //Update product
async updatePackage(name)
{
  
 const modal = await this.modalCtrl.create({
    component: UpdatePackageModalComponent,
    componentProps: {
      existingPackage: name
    }
  });
  await modal.present();
}

//Delete product
async deletePackage(id: number) {
  const alert = await this.alertController.create({
    cssClass: 'messageAlert',
    message: 'Are you sure you would like to permanently remove this package? ',
    buttons: [
      {
        text: 'Confirm',
        cssClass: 'Confirm',
        handler: () => {
          this.api.DeletePackage(id).subscribe(() => console.log("deleted successfully"))
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
      message: 'Successfully deleted Package',
      cssClass: 'successToaster',
      duration: 2000
    });
    toast.present(); 
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
