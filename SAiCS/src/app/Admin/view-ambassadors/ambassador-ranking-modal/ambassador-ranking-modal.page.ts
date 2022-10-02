import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-ambassador-ranking-modal',
  templateUrl: './ambassador-ranking-modal.page.html',
  styleUrls: ['./ambassador-ranking-modal.page.scss'],
})
export class AmbassadorRankingModalPage implements OnInit {

  //Variables
  ranking
  updateRanking= undefined
  discount:FormGroup
  updateID
  //error:boolean = false
  constructor(private modal:ModalController, 
    private api:ApiService, private alert:AlertController) { 

  }

  ngOnInit() {
    console.log(this.ranking)
    this.discount = new FormGroup({
      ambDiscount : new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([0-9]*)(.)([0-9]*)/)])),
      ambCommissionRate : new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([0-9]*)(.)([0-9]*)/)]))
    })
  }

  Dissmiss(){
    this.modal.dismiss({amytypes : this.ranking , status: true})

  }
  Close(){
    this.modal.dismiss({amytypes : this.ranking , status: false})

  }
  SelectedAmbassadorRanking(event){
    console.log(event)
    console.log(this.ranking[event.detail.value-1])
    this.discount.controls['ambDiscount'].setValue(this.ranking[event.detail.value-1].discountPercentage*100)
    this.discount.controls['ambCommissionRate'].setValue(this.ranking[event.detail.value-1].commissionRate*100)
    this.updateID = event.detail.value-1
    
    this.updateRanking = this.ranking[event.detail.value-1]

    console.log("update",this.updateRanking)
  }

  AssignAmbRanking(){
    if(this.discount.valid){
      console.log(this.updateID)
      this.ranking[this.updateID].discountPercentage = (this.discount.get(['ambDiscount']).value/100)
      this.ranking[this.updateID].commissionRate = (this.discount.get(['ambCommissionRate']).value/100)
      console.log("update",this.updateRanking)
      this.api.UpdateAmbassadorDiscounts(this.updateRanking).subscribe(data => {
        console.log(data)
        
        this.api.GetAmbassadorRankings().subscribe(data => {
          this.alertNotif("Ambassador ranking has been updated","Success")
          this.ranking = data
        })
      })
    }
    else{
      console.log("Invalid ")
    }
  }
  
  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler:()=> {
        this.Dissmiss()
      }}]
    });

    await alert.present();
  }
}
