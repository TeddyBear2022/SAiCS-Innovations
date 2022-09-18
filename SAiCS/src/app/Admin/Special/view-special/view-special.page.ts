import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-special',
  templateUrl: './view-special.page.html',
  styleUrls: ['./view-special.page.scss'],
})
export class ViewSpecialPage implements OnInit {
  specials: any= []
  specialTypes: any = [];
  specialOption = 'All'
  imageArray: any = [];
  filterKeys = ['name', 'description','type'];
  search;
  p;

  constructor( public popoverController: PopoverController,
    private api: ApiService, private router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private alert:AlertController
    ) { }

  ngOnInit() {
    this.GetInfo()
   
   // console.log(this.specials);
  }
  
  ionViewDidEnter(){
    this.GetInfo()
    //this.GetMerchImage()
  }

  GetInfo()
  {
  

    this.api.GetAllSpecials().subscribe((data) => {
      this.specials = data
      this.imageArray = new Array(this.specials.length).fill(null);
    console.log(this.imageArray);

    this.specials.forEach((obj: any) => {
      let index = this.specials.findIndex(x => x.id == obj.id);
    console.log(`index: ${index}`);

      this.api.GetSpImage(obj.id).subscribe((baseImage: any) =>{
        //console.log(baseImage);
        this.imageArray[index] = baseImage.image
      })
    })

    });

      this.api.GetSpecialTypes().subscribe(res => {
        this.specialTypes = res
        //console.log(this.specials);
        
      })

  }

  // GetMerchImage()
  // {
  //   this.imageArray = new Array(this.specials.length).fill(null);
  //   console.log(this.imageArray);

  //   this.specials.forEach((obj: any) => {
  //     let index = this.specials.findIndex(x => x.id == obj.id);
  //   console.log(`index: ${index}`);

  //     this.api.GetSpImage(obj.id).subscribe((baseImage: any) =>{
  //       //console.log(baseImage);
  //       this.imageArray[index] = baseImage.image
  //     })
  //   })
  // }

  PerformDelete(id: number)
  {
    this.api.DeleteSpecial(id).subscribe((res) => {
      if(res.body == "Deleted")
      {
        this.GetInfo()
        this.presentToast()
        console.log('Confirm Ok');
      }
      else
      {
        this.Notif(res.body) 
      }
      })
  }


  updateSpecial(id: number)
  {
    localStorage.setItem('UpdateId', JSON.stringify(id))
    this.router.navigate(['/update-special'])
  }

 async DeleteSpecial(id: number)
  {
    const alert = await this.alertController.create({
      cssClass: 'messageAlert',
      message: 'Are you sure you would like to permanently remove this item? ',
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'Confirm',
          handler: () => {
           this.PerformDelete(id)
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
    message: 'Successfully deleted',
    cssClass: 'successToaster',
    duration: 5000
  });
  toast.present(); 
  window.location.reload() 
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
