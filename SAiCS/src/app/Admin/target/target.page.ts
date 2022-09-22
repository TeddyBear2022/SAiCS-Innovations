import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
//import { CreatePackageModalComponent } from 'src/app/Product/create-package-modal/create-package-modal.component';
import { AssignTargetPage } from './Modals/assign-target/assign-target.page';
import { UpdateTargetPage } from './Modals/update-target/update-target.page';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

  //Variables
  targets:any = []
  updateTargetInfo
  username
 
  constructor(private menu:MenuController,
    private modal: ModalController,
    private alert:AlertController, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.AllTargetInfo().subscribe(data => {
      this.targets = data
      console.log(this.targets)

    })
    this.username = localStorage.getItem('UserName')
  }
  ionViewDidEnter(){
    this.api.AllTargetInfo().subscribe(data => {
      this.targets = data
      console.log(this.targets)
    })
    this.username = localStorage.getItem('UserName')
  }

  AssignTarget(id:number){
    this.api.TargetExists(id).subscribe(data => {
      console.log(data)
      if(data == true){
        this.targetExists("Oops","A target already exists for this user. Either update or delete their target.")
      }
      if(data == false){
        this.assignTarget(id)
      }
    })
    
  }

  async assignTarget(id:number)
  {
   const modals = await this.modal.create({
      component: AssignTargetPage,
      componentProps:{ambassadorid: id}
    });
    modals.onDidDismiss().then((data) => {
      this.targets = data.data.targets
    })
     await modals.present();
  }
 
  DeleteTarget( targetId:number){
    this.alertNotif("", "Are you sure you want to permently delete this target?",targetId )
    
  }
TargetDoesntExists(){
  this.targetExists("Oops","A target doesn't exist for this user. Please create one.")
}

  async alertNotif(header:string, message:string, targetId:number) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'confirm', handler:()=>{
      console.log("Delete target", targetId);
      this.api.DeleteTarget(targetId).subscribe(data => {
        console.log(data)
        this.api.AllTargetInfo().subscribe(data => {
          this.targets = data
          console.log(this.targets)
    
        })
        
      })

      }},
    {text: "Cancel"}]
    });

    await alert.present();
  }

  async targetExists(header:string, message:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'Ok', handler:()=>{
      this.alert.dismiss()
      }}]
    });

    await alert.present();
  }
  UpdateTarget(id){
    this.api.TargetExists(id).subscribe(data => {
      console.log(data)
      if(data == true){
        this.api.GetSpecificTarget(id).subscribe(data => {
          this.updateTargetInfo =data 
          console.log(data)
          this.updateTarget(id)
        })
      }
      if(data == false){
        this.targetExists("Oops","A target doesn't exist for this user. Please create one.")
      }
    })
    
  }
  async updateTarget(id:number)
  {
   const modals = await this.modal.create({
      component: UpdateTargetPage,
      componentProps: {updateAmbID : id , targetUpdate: this.updateTargetInfo}

    });
    modals.onDidDismiss().then((data) => {
      this.targets = data.data.targets
    })
     await modals.present();
  }
}
