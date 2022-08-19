import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assign-target',
  templateUrl: './assign-target.page.html',
  styleUrls: ['./assign-target.page.scss'],
})
export class AssignTargetPage implements OnInit {

     //Variables
     CreateTargetForm:FormGroup
     UpdateTargetForm:FormGroup
    constructor(private modal:ModalController) { }
  
    ngOnInit() {
      this.CreateTargetForm = new FormGroup({
        target: new FormControl('', Validators.required),
        dateFrom: new FormControl('', Validators.required),
        dateTo: new FormControl('', Validators.required)
  
      })
      this.UpdateTargetForm = new FormGroup({
        updatetarget: new FormControl('', Validators.required),
        updatedateFrom: new FormControl('', Validators.required),
        updatedateTo: new FormControl('', Validators.required)
      })
    }
  
    Cancel(){
      this.modal.dismiss()
    }
  
    CreateTarget(){
      console.log(this.CreateTargetForm.value);
      
    }
    UpdateTarget(){
      console.log(this.UpdateTargetForm.value);
      
    }
}
