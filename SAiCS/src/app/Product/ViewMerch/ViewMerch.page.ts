import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CreateMerchModalComponent } from '../CreateMerchModal/CreateMerchModal.component';
import { UpdateMerchModalComponent } from '../UpdateMerchModal/UpdateMerchModal.component';
import { MerchVM } from 'src/app/Models/ViewModels/MerchVM';

@Component({
  selector: 'app-view-merch',
  templateUrl: './ViewMerch.page.html',
  styleUrls: ['./ViewMerch.page.scss'],
})
export class ViewMerchPage implements OnInit {
  merch = []
  merchCat = [];
  merchStatus = [];
  merchCatOption = ''
  filterKeys = ['name', 'type','catID'];
  search;
  typeSelect = "";
  p;
  username
  imageArray: any = [];
  removeImage = 0;
  

  constructor(
  public popoverController: PopoverController, 
  private api: ApiService, 
  private modalCtrl: ModalController,
  public alertController: AlertController,
  public toastController: ToastController,
  private alert:AlertController,
  private menu:MenuController,
  private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.username = localStorage.getItem('UserName')
   // this.GetAllMerch()
    this.GetMerchCat()
    this.GetMerchStatuses();
    
  }

  ionViewDidEnter(){
    this.GetAllMerch()
    this.GetMerchCat()
    this.GetMerchStatuses();
    this.showLoading();
  }
  
  GetMerchCat() {
    this.api.GetMerchCat().subscribe((data) => {
      this.merchCat = data;
    });
  }

  GetMerchStatuses() {
    this.api.GetMerchStatuses().subscribe((data) => {
      this.merchStatus = data;
    });
  }

//Get products
GetAllMerch()
{
  
  this.api.GetAllMerch().subscribe(data =>
    {
      this.merch = data
      console.log(this.merch);

      this.imageArray = new Array(this.merch.length).fill(null);
      //if(this.imageArray.length > 0){this.showLoading()}
      
      //console.log(this.imageArray);

      this.merch.forEach((obj: any) => {
        let index = this.merch.findIndex((x) => x.id == obj.id);

        this.api.GetMerchImage(obj.id).subscribe((baseImage: any) => {
          this.imageArray[index] = { id: obj.id, image: baseImage.image };
        });
     
      });
     
      
    },
    (error) => { console.log(error) },
    () => {
      console.log("log");
      setTimeout(() => {
        this.loadingCtrl.dismiss()
      }, 10000);
   
    })
  
}

async finishLoading() {
  await this.loadingCtrl.dismiss().catch(() => {});
}

GetMerchImage(id: number) {
  return this.imageArray.find((x) => x?.id === id)?.image;
}

onLoad(id: number){
  this.removeImage++
  console.log(this.removeImage);
  
  // if(this.removeImage > 3)
  // {
  //  this.loadingCtrl.dismiss()
  // }
}

async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Loading',
    cssClass: 'custom-loading',
    spinner: 'lines',
  });
  
  loading.present();
  
}
  

//create product
 async createProduct()
{
 const modal = await this.modalCtrl.create({
    component: CreateMerchModalComponent,
    id: 'createProductClass',
    
  });
 
  modal.onDidDismiss().then((data) => {
    this.showLoading()
    this.GetAllMerch()
  })

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

  modal.onDidDismiss().then((data) => {
    this.showLoading()
    this.GetAllMerch()
  })
  
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
          this.DeleteItem(id)
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

DeleteItem(id: number)
{
  this.api.DeleteMerch(id).subscribe((res) => {
    console.log(res.body)
    let message = ""
    if(res.body == "Item Deleted")
    {
      message = "Item deleted Sucessfully deleted"
      this.Notif(message) 
      //this.presentToast()
    }
    else if(res.body.includes('547'))
    {
      console.log(547);
      this.Notif(res.body) 

      const statusId = this.merchStatus.find(x => x.merchStatusName == "Discontinued");
      
      let uMerch = {} as MerchVM;
      uMerch.statusId = statusId.merchStatusId;

    
    this.api.UpdateMerch(id, uMerch).subscribe((res) =>{
      if(res.body == "Item Updated successfully")
      {
        console.log(res.body);
        this.GetAllMerch()
      }
      else
      {
        console.log(res.body);
      }
     
      
    })
   
      
    }
     else
     {
        this.Notif(res.body) 
     }
     this.showLoading()
     this.GetAllMerch()
  })
  
  console.log('Confirm Ok');
}

async Notif(message:string) {
  const alert = await this.alert.create({
    message: message,
    buttons: [{text: 'OK'}]
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
