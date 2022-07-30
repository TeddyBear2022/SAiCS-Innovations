import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RankingModalComponent } from 'src/app/modals/ranking-modal/ranking-modal.component';
import { credentialsVM } from 'src/app/Models/ViewModels/credentialsVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  ambassadorsList= [];
  userSesionInfo = [];
  closeResult: string;

  constructor(private modal: ModalController , private tmpStorage:TemporaryStorage, private api:ApiService) { }

  ngOnInit() {
    this.userSesionInfo = this.tmpStorage.getSessioninfo();
    // this.ambassadorsList.push(this.userSesionInfo)
    console.log("testing")
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    
    this.api.ViewAmbassadors(credentials).subscribe(data=> 
      {
        this.ambassadorsList.push(data)
        console.log(this.ambassadorsList)
      })
    // this.ambassadorsList = this.api.ViewAmbassadors(this.userSesionInfo[0].userId).subscribe()
    
  }

  RankingRequest(){
    this.rankingrequest
  }
  async rankingrequest()
  {
    const modal = await this.modal.create({
      component: RankingModalComponent,
      id: "rankingrequestClass",
    });
    modal.onDidDismiss().then(()=>{
    })
  }


}
