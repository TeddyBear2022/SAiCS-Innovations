import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Target } from 'src/app/Models/Target';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-target',
  templateUrl: './update-target.page.html',
  styleUrls: ['./update-target.page.scss'],
})
export class UpdateTargetPage implements OnInit {
  //Variables
  UpdateTargetForm:FormGroup
  updateAmbID
  targetUpdate
  AllTargets
  
  constructor(private modal:ModalController, 
    private api:ApiService) { }

  ngOnInit() {
    console.log(this.targetUpdate)
    this.UpdateTargetForm = new FormGroup({
      updatetarget: new FormControl(this.targetUpdate.target1, Validators.required),
      updatedateFrom: new FormControl(new Date(this.targetUpdate.startDate).toISOString().substring(0,10), Validators.required),
      updatedateTo: new FormControl(new Date(this.targetUpdate.endDate).toISOString().substring(0,10), Validators.required)
    })
    console.log(this.updateAmbID)
  }

  Cancel(){
    this.modal.dismiss()
  }

  Dissmiss(){
    this.modal.dismiss({targets : this.AllTargets})
  }

  UpdateTarget(){
    if(this.UpdateTargetForm.invalid && this.UpdateTargetForm.get(['updatedateFrom']).value >=this.UpdateTargetForm.get(['updatedateTo']).value){
      console.log("invalid form")
    }
    if(this.UpdateTargetForm.valid && this.UpdateTargetForm.get(['updatedateFrom']).value <=this.UpdateTargetForm.get(['updatedateTo']).value){
      let updateTarget:Target = new Target()
      updateTarget.AmbassadorId = this.targetUpdate.ambassadorId
      updateTarget.StartDate = this.UpdateTargetForm.get(['updatedateFrom']).value
      updateTarget.EndDate = this.UpdateTargetForm.get(['updatedateTo']).value
      updateTarget.Target1 =this.UpdateTargetForm.get(['updatetarget']).value
      console.log(updateTarget)
      this.api.UpdateTarget(updateTarget).subscribe(data => {
        console.log(data)
        this.api.AllTargetInfo().subscribe(data => {
          this.AllTargets = data
          console.log(this.AllTargets)
          this.Dissmiss()
        })
      })
    }
    
    
  }
}
