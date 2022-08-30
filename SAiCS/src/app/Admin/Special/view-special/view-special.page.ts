import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
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
  constructor( public popoverController: PopoverController,
    private api: ApiService, private router: Router,
    public alertController: AlertController,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.GetInfo()
  }

  GetInfo()
  {
      this.api.GetSpecialTypes().subscribe(res => {
        this.specialTypes = res
      })

      this.api.GetAllSpecials().subscribe(res => {
        this.specials = res
      })

  }


  createSpecial()
  {

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
            this.api.DeleteSpecial(id).subscribe(() => console.log("deleted successfully"))
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
