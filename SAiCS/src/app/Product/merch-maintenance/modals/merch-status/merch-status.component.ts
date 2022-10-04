import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MerchStatus } from 'src/app/Models/MerchStatus';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-merch-status',
  templateUrl: './merch-status.component.html',
  styleUrls: ['./merch-status.component.scss'],
})
export class MerchStatusComponent implements OnInit {

  lookUpForm: FormGroup;
  merchStatus = [];
  editCache: { [key: string]: any } = {};
  isAddClicked = false;
  isEditClicked = false;
  isSaveEditClicked = false;
  filterKeys = ['name'];
  search;
  p;
  
  constructor(private api: ApiService, private fb: FormBuilder, private alert:AlertController) { }

  ngOnInit() {
    this.GetMerchStatuses()
    this.lookUpForm = this.fb.group({
      formName: new FormControl('', Validators.required)
    });
  }

  //Loadsection
  GetMerchStatuses() {
    this.api.GetMerchStatuses().subscribe((data) => {
      for(let d of data)
      {
         this.merchStatus.push({
          id: d.merchStatusId,
          name: d.merchStatusName
         })
      }
      this.updateEditCache();
    });
  }

  //Create Section

  startCreate(): void {
    this.isAddClicked = true;
    console.log(this.isAddClicked);
    
  }

  SendData()
  {
    let item = this.merchStatus.find(item => item.name === this.lookUpForm.get('formName').value);

    if(this.lookUpForm.valid)
    {
      if(item)
    {
      this.Notif("This record already exists")
    }
    else
    {
      let value = `'${this.lookUpForm.get('formName').value}'`
      console.log(value)
       this.api.CreateLookUp("MerchStatus", value).subscribe((res) => {
        if(res.body == 1 || res.body == 0)
        {
          console.log(res.body);
          
          this.lookUpForm.reset();
          this.isAddClicked = false;
          this.merchStatus.length = 0
          this.GetMerchStatuses()
        }
        else 
        {
           this.Notif(res.body)
        }
      });
    }
      
    }
    else
    {
      console.log("invalid")
    }
    
  }

  CancelCreate()
  {
    this.lookUpForm.reset();
    this.isAddClicked = false;
  }


  //Edit Section
  startEdit(id: string): void {
    this.editCache[id].edit = true;
    this.isEditClicked = true;
  }

  updateEditCache(): void {
    this.merchStatus.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
    this.isEditClicked = false;
  }

  saveEdit(id: string): void {
    this.isSaveEditClicked = true;
    
    let item = this.merchStatus.find(item => item.id === id);
    if(this.editCache[id].data.name)
    {
    let update = {} as MerchStatus;
    update.merchStatusId = item.id
    update.merchStatusName = this.editCache[id].data.name

    this.api.UpdateMerchStatus(update).subscribe(res =>{
      if(res.body == "Success")
      {
        this.isEditClicked = false;
        this.merchStatus.length = 0
        this.GetMerchStatuses()
      }
      else
      {
        this.Notif(res.body)
      }
  
    })}
  }

  cancelEdit(id: string): void {
    const index = this.merchStatus.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.merchStatus[index] },
      edit: false
    };
    this.isEditClicked = false;
  }

  //Remove Section

  remove(index: number) {
    this.api.DeleteLookUp("MerchStatus",index).subscribe((res) => {
      if(res.body == 1 || res.body == 0)
      {
        this.merchStatus.length = 0
        this.GetMerchStatuses()
      }
      else if(res.body)
      {
         this.Notif(res.body)
      }

    })
   
  }


  async Notif(message:string) {
    const alert = await this.alert.create({
      message: message,
      buttons: [{text: 'OK'}]
    });
  
    await alert.present();
    
  }
}
