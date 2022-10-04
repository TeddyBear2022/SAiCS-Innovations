import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss'],
})
export class VatComponent implements OnInit {

  lookUpForm: FormGroup;
  lookUpArr: any = [];
  editCache: { [key: string]: any } = {};
  isAddClicked = false;
  isEditClicked = false;
  isSaveEditClicked = false;
  p;
  datepipe: DatePipe = new DatePipe('en-US')
  
  constructor(private api: ApiService, private fb: FormBuilder, private alert:AlertController) { }
 
  ngOnInit() {
    this.LoadInfo()
    this.lookUpForm = this.fb.group({
      vatPercentage: new FormControl('', Validators.required)
    });
  }

  //Loadsection
  LoadInfo() {
    this.api.GetAllVAT().subscribe((data) => {
      
      this.lookUpArr = data
      //console.log(this.lookUpArr);
      this.updateEditCache();
    });
  }

  updateEditCache(): void {
    this.lookUpArr.forEach(item => {
      this.editCache[item.vatid] = {
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
    let item = this.lookUpArr.find(item => item.vatid === this.lookUpForm.get('vatPercentage').value);

    if(this.lookUpForm.valid && this.lookUpForm.get('vatPercentage').value > -1)
    {
      if(item)
    {
      this.Notif("This record already exists")
    }
    else
    {
      let value = `'${this.lookUpForm.get('vatPercentage').value}'`
      let date = Date.now()
      let formattedDate = this.datepipe.transform(date, 'yyyy-MM-dd hh:MM:ss')
      let join = `CAST('${formattedDate}' AS DATETIME2), ${value}`

      console.log(formattedDate)
       this.api.CreateLookUp("VAT", join).subscribe((res) => {
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
  
  let item = this.lookUpArr.find(item => item.vatid === id);
  if(this.editCache[id].data.vatPercentage > -1)
  {
    this.api
    .UpdateVAT(item.vatid , this.editCache[id].data.vatPercentage)
    .subscribe((res) => {
      if(res.body == "Updated")
      {
        this.isEditClicked = false;
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

cancelEdit(id: string): void {
  const index = this.lookUpArr.findIndex(item => item.vatid === id);
  this.editCache[id] = {
    data: { ...this.lookUpArr[index] },
    edit: false
  };
  this.isEditClicked = false;
}

  //Remove Section

  remove(index: number) {
    this.api.DeleteLookUp("VAT",index).subscribe((res) => {
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
