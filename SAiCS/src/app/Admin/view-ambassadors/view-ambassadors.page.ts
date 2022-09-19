import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AmbassadorRankingModalPage } from './ambassador-ranking-modal/ambassador-ranking-modal.page';

@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  //Variables
  Ambassadors:any = []
  search:any = undefined
  noResults:boolean = false
  AmbassadorRankings:any = []
  ambassadorRankingsInput
  username

  constructor(private popoverController:PopoverController, 
    private api:ApiService, 
    private modal: ModalController,
    private alert:AlertController) { }

  ngOnInit() {
    this.username = localStorage.getItem('UserName')
  }

  ionViewDidEnter(){
    this.api.ViewAllAmbassadors().subscribe(data =>
      {
        this.Ambassadors = data
        console.log(data);
        
      })

      this.api.GetAmbassadorRankings().subscribe(data => {
        //console.log(data)
        this.AmbassadorRankings = data
      })

      this.api.InputInformation().subscribe(data=>{
        this.ambassadorRankingsInput = data
        console.log(data)
      })
      
      this.username = localStorage.getItem('UserName')
      
  }

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  SearchAmbassador(event){
    // console.log(event.detail.value);
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }

  Search(){
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
      console.log("search...",this.search)
      this.api.SearchAmbassador(this.search).subscribe(data =>{
        this.noResults = false 
        this.Ambassadors = data
        console.log(data);
        
      },(response: HttpErrorResponse) => {
        if (response.status === 404) {
          this.noResults = true 
          console.log("Search result not found")
        }
        
    })
    }
  
}

  ClearSearch(){
    console.log("clear");
    this.search= undefined
    this.noResults = false 
    this.api.ViewAllAmbassadors().subscribe(data =>
      {
        this.Ambassadors = data
        
      })
  }
  MaintainAmbRankings(){
    this.maintainAmbRanking()
  }

  async maintainAmbRanking(){
    console.log("Open maintain category model");
    const modal = await this.modal.create({
      component: AmbassadorRankingModalPage,
      componentProps:{ranking : this.AmbassadorRankings}
    });
    modal.onDidDismiss().then((info) => {
      console.log(info.data.amytypes)
      if(info.data.status == true){
      this.AmbassadorRankings = info.data.amytypes
    }
    })
    
    await modal.present();
    
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }
}
