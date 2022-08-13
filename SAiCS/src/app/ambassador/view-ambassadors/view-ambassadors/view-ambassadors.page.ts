import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
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

  ambassadorsList:any[]= [];
  userSesionInfo =[];
  closeResult: string;

  constructor(private modal: ModalController , 
    private tmpStorage:TemporaryStorage, 
    private api:ApiService,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.userSesionInfo = this.tmpStorage.getSessioninfo();
    // this.ambassadorsList.push(this.userSesionInfo)
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    
    this.api.ViewAmbassadors(credentials).subscribe(data=> 
      {
        // data.forEach(element => {
        //   this.ambassadorsList.push(element)
        // });
        for(let i=0; i<data.length; i++){
          this.ambassadorsList.push(data[i])
          console.log(this.ambassadorsList[i])
          console.log(i);
          
        }
        // this.ambassadorsList = data 
        //console.log(data);
              
      })
      
      
      
    // this.ambassadorsList = this.api.ViewAmbassadors(this.userSesionInfo[0].userId).subscribe()
    
  }

  RankingRequest(){
   
    this.rankingrequest
   
    
  }
  async rankingrequest()
  {
    // console.log(this.ambassadorsList[1])
    // console.log("works");
    const modal = await this.modal.create({
      component: RankingModalComponent,
      // componentProps: {
      //   updateFAQs: faq,
      // }
      //id: "rankingrequestClass",
    });
    modal.onDidDismiss().then(()=>{
    })
    await modal.present();
  }


}
