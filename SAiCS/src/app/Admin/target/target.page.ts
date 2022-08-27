import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
//import { CreatePackageModalComponent } from 'src/app/Product/create-package-modal/create-package-modal.component';
import { AssignTargetPage } from './Modals/assign-target/assign-target.page';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

 
  constructor(private menu:MenuController,
    private modal: ModalController, 
    private alert:AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    
  }

  AssignTarget(){
    this.assignTarget()
  }

  async assignTarget()
  {
   const modals = await this.modal.create({
      component: AssignTargetPage
    });
    modals.onDidDismiss().then((data) => {
      
    })
     await modals.present();
  }
 
  DeleteTarget(){
    this.alertNotif("", "Are you sure you want to delete this target")
  }
  async alertNotif(header:string, message:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'Yes', handler:()=>{
      console.log("Delete target");

      }},
    {text: "No"}]
    });

    await alert.present();
  }
}
