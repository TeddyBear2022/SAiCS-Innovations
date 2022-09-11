import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-maintain-special-type',
  templateUrl: './maintain-special-type.component.html',
  styleUrls: ['./maintain-special-type.component.scss'],
})
export class MaintainSpecialTypeComponent implements OnInit {
  addForm: FormGroup;
  update: FormGroup;
  type: any;
  specialTypes: any = [];
  typeSelected = null;
  error: boolean = false;
  isExisting: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      addName: new FormControl('', Validators.required),
    });

    this.update = this.fb.group({
      updateType: new FormControl('', Validators.required),
      updateName: new FormControl('', Validators.required),
    });

    this.GetInfo()
  }

  GetInfo() {
    this.api.GetSpecialTypes().subscribe((res) => {
      this.specialTypes = res;
    });
  }

  ActionSelected(e) {
    let value = e.target.value;

    switch (value) {
      case 1:
        this.typeSelected = 1;
        break;
      case 2:
        this.typeSelected = 2;
        break;

      case 3:
        this.typeSelected = 3;
        break;
      default:
        this.typeSelected = 0;
        break;
    }

    console.log(value);
  }


  TransferUpdate(event)
  {
    let value = event.target.value
    let transfer = this.specialTypes.find(x => x.id == value)
    this.update.get('updateName').setValue(transfer.type) 
    //console.log();
    
  }

  CreateType() {
    if(this.addForm.valid)
    {
      let value = this.addForm.get('addName').value
      this.api.CreateSpecialType(value).subscribe((res) =>{
        console.log(res.body);
       if(res.body == "Exists")
       {
        this.isExisting = true

       }
       else(res.body == "Created")
       {
        this.isExisting = false
        this.addForm.reset()
        this.dismissModal()
       }
          
      })
    }
    else
    {
      console.log("Invalid form");
      
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }


  submitForm() {
    if (this.update.valid) {
     // console.log();
      this.api
      .UpdateSpecialType(this.update.get('updateType').value, this.update.get('updateName').value)
      .subscribe(res => {console.log(res.body);}
      )
    } else {
      console.log('invalid');
    }
  }

  RemoveItem(id)
  {

    console.log(id);
    
    this.api.DeleteSpecialType(id).subscribe(res =>{
      console.log(res.body);
      this.GetInfo()
    })
    
  }


}
