import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SpecialStatus } from 'src/app/Models/SpecialStatus';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-main-special-status',
  templateUrl: './main-special-status.component.html',
  styleUrls: ['./main-special-status.component.scss'],
})
export class MainSpecialStatusComponent implements OnInit {
  lookUpForm: FormGroup;
  lookUpArr = [];
  editCache: { [key: string]: any } = {};
  isAddClicked = false;
  isEditClicked = false;
  isSaveEditClicked = false;
  filterKeys = ['name'];
  search;
  p;
  
constructor(private api: ApiService, private fb: FormBuilder, private alert:AlertController) { }

ngOnInit() {
  this.LoadInfo()
  this.lookUpForm = this.fb.group({
    formName: new FormControl('', Validators.required)
  });
}

//Loadsection
LoadInfo() {
  this.api.GetSpecialStatuses().subscribe((res) => {
    let data: any = res
    console.log(data);
    
    for(let d of data)
    {
       this.lookUpArr.push({
        id: d.specialStatusId,
        name: d.statusName
       })
    }
    //console.log(this.lookUpArr);
    
    this.updateEditCache();
  });
}

updateEditCache(): void {
  this.lookUpArr.forEach(item => {
    this.editCache[item.id] = {
      edit: false,
      data: { ...item }
    };
  });
  this.isEditClicked = false;
}

//Create Section

startCreate(): void {
  this.isAddClicked = true;
  console.log(this.isAddClicked);
  
}

SendData()
{
  let item = this.lookUpArr.find(item => item.name === this.lookUpForm.get('formName').value);

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
     this.api.CreateLookUp("SpecialStatus", value).subscribe((res) => {
      if(res.body == 1 || res.body == 0)
      {
        console.log(res.body);
        
        this.lookUpForm.reset();
        this.isAddClicked = false;
        this.lookUpArr.length = 0
        this.LoadInfo()
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

saveEdit(id: string): void {
  this.isSaveEditClicked = true;
  
  let item = this.lookUpArr.find(item => item.id === id);
  if(this.editCache[id].data.name)
  {
  let update = {} as SpecialStatus;
  update.specialStatusId = item.id
  update.statusName = this.editCache[id].data.name

  this.api.UpdateSepcialStatus(update).subscribe(res =>{
    if(res.body == "Success")
    {
      this.isEditClicked = false;
      this.lookUpArr.length = 0
      this.LoadInfo()
    }
    else
    {
      this.Notif(res.body)
    }

  })
}
}

cancelEdit(id: string): void {
const index = this.lookUpArr.findIndex(item => item.id === id);
this.editCache[id] = {
  data: { ...this.lookUpArr[index] },
  edit: false
};
this.isEditClicked = false;
}

//Remove Section

remove(index: number) {
  this.api.DeleteLookUp("SpecialStatus",index).subscribe((res) => {
    if(res.body == 1 || res.body == 0)
    {
      this.lookUpArr.length = 0
      this.LoadInfo()
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
