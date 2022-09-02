import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ambassador-ranking-modal',
  templateUrl: './ambassador-ranking-modal.page.html',
  styleUrls: ['./ambassador-ranking-modal.page.scss'],
})
export class AmbassadorRankingModalPage implements OnInit {

  //Variables
  ranking
  updateRanking= undefined
  // discount:FormGroup
  error:boolean = false
  constructor(private modal:ModalController) { 

  }

  ngOnInit() {
    console.log(this.ranking)
    // this.discount = new FormGroup({
    //   ambDiscount : new FormControl(this.updateRanking.discountPercentage, Validators.required)
    // })
  }

  Close(){
    this.modal.dismiss()
  }
  SelectedAmbassadorRanking(event){
    console.log(event.detail.value)
    this.updateRanking = this.ranking[event.detail.value-1]
    console.log(this.updateRanking)
  }

  AssignAmbRanking(){
    if(this.updateRanking == undefined || isNaN(this.updateRanking.discountPercentage)){

      // if(isNaN(this.updateRanking.discountPercentage)){
      //   this.error= true
      // }
      // else{
      // console.log('Invalid form')
      // }
    }

    if(this.updateRanking != undefined && !isNaN(this.updateRanking.discountPercentage)){
      console.log(this.updateRanking)
    }

  }
  

}
