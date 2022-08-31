import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Target } from 'src/app/Models/Target';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-assign-target',
  templateUrl: './assign-target.page.html',
  styleUrls: ['./assign-target.page.scss'],
})
export class AssignTargetPage implements OnInit {

  
     //Variables
     ambassadorid
     alltargets
     
     CreateTargetForm:FormGroup
    constructor(private modal:ModalController, 
      private api:ApiService, 
      private alert:AlertController) { }
  
    ngOnInit() {
      this.CreateTargetForm = new FormGroup({
        target: new FormControl('', Validators.required),
        dateFrom: new FormControl('', Validators.required),
        dateTo: new FormControl('', Validators.required)
  
      })
      console.log(this.ambassadorid)
    }
  
    Cancel(){
      this.modal.dismiss()
    }
    Dissmiss(){
      this.modal.dismiss({targets : this.alltargets})
    }
  
    CreateTarget(){
      if(this.CreateTargetForm.invalid && this.CreateTargetForm.get(['dateFrom']).value >=this.CreateTargetForm.get(['dateTo']).value){
        console.log('invalid');
      }
      if(this.CreateTargetForm.valid && this.CreateTargetForm.get(['dateFrom']).value <=this.CreateTargetForm.get(['dateTo']).value){
        let newTarget:Target = new Target()
        newTarget.AmbassadorId = this.ambassadorid
        newTarget.StartDate = this.CreateTargetForm.get(['dateFrom']).value
        newTarget.EndDate = this.CreateTargetForm.get(['dateTo']).value
        newTarget.Target1 = this.CreateTargetForm.get(['target']).value

        this.api.CreateTarget(newTarget).subscribe(data => {
          console.log(data);
          this.api.AllTargetInfo().subscribe(data => {
            this.alltargets = data
            this.Dissmiss()
            console.log(this.alltargets)
          })
        },(response: HttpErrorResponse) => {
        
          if (response.status === 404) {
             this.alertNotif("A target is already assigned to this user, rather update or delete their target","Oops!")
          }
          if (response.status === 500){
            this.alertNotif("Encountered an error, please try again  later","opps!")
          }
          if (response.status === 400){
            this.alertNotif("Something went wrong, please try again later","Oops")
          }
          
        })
      }
     
      
    }
    async alertNotif(message:string, header:string) {
      const alert = await this.alert.create({
        header: header,
        message: message,
        buttons: [{text: 'OK', handler:()=>{
          this.Cancel()
        }}]
      });
  
      await alert.present();
    }
    
}
