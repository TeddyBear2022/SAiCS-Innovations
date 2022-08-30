import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { credentialsVM } from 'src/app/Models/ViewModels/credentialsVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.page.html',
  styleUrls: ['./view-clients.page.scss'],
})
export class ViewClientsPage implements OnInit {

  constructor( private tmpStorage:TemporaryStorage,
    private api:ApiService,
    private menu:MenuController) { }

  ambassadorsList= [];
  userSesionInfo = [];
  
  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.userSesionInfo = this.tmpStorage.getSessioninfo();
    // this.ambassadorsList.push(this.userSesionInfo)
    console.log("testing")
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    
    this.api.ViewClients(credentials).subscribe(data=> 
      {
        this.ambassadorsList.push(data)
        console.log(this.ambassadorsList)
      })
    // this.ambassadorsList = this.api.ViewAmbassadors(this.userSesionInfo[0].userId).subscribe()
    
  }

}
