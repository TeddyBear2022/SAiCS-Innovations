import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DeliveryTypeVM } from 'src/app/Models/ViewModels/DeliveryTypeVM';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.scss'],
})
export class DeliveryTypeComponent implements OnInit {

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
      formName: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  //Loadsection
  LoadInfo() {
    this.api.GetDeliveryTypes().subscribe((data) => {
      
      for(let d of data)
      {
         this.lookUpArr.push({
          id: d.id,
          name: d.name,
          price: d.price,
         })
      }
      console.log(this.lookUpArr);
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
  
      if(this.lookUpForm.valid)
      {
        let update = {} as DeliveryTypeVM;
        update.Name = this.lookUpForm.get('formName').value
        update.Amount = this.lookUpForm.get('price').value

         this.api.AddDeliveryType(update).subscribe((res) => {
          if(res.body == "Created")
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
    if(this.editCache[id].data.name && this.editCache[id].data.price > -1)
    {
    let update = {} as DeliveryTypeVM;
    update.Id = item.id
    update.Name = this.editCache[id].data.name
    update.Amount = this.editCache[id].data.price
  
    this.api.UpdateDeliveryType(update).subscribe(res =>{
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
  
    remove(id: number) {
      this.api.DeleteDeliveryType(id).subscribe((res) => {
        if(res.body == "Deleted")
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
