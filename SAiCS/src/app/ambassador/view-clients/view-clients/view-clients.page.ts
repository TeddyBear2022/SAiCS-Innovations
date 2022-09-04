import { HttpErrorResponse } from '@angular/common/http';
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

  clientList;
  noResults:boolean = false
  search:any
  userSesionInfo = [];
  
  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    // this.userSesionInfo = this.tmpStorage.getSessioninfo();
    // // this.ambassadorsList.push(this.userSesionInfo)
    // console.log("testing")
    // let credentials:credentialsVM = new credentialsVM()
    // credentials.userID = this.userSesionInfo[0].id
    this.userSesionInfo = this.tmpStorage.getSessioninfo();
    this.api.ViewClients().subscribe(data=> 
      {
        this.clientList = data
        console.log(this.clientList)
      })
    // this.ambassadorsList = this.api.ViewAmbassadors(this.userSesionInfo[0].userId).subscribe()
    
  }
  SearchAmbassador(event){
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }

  ClearSearch(){
    console.log("clear");
    this.noResults = false 
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    // this.api.ViewAmbassadors(credentials).subscribe(data =>
    //   {
    //     this.ambassadorsList = data
        
    //   })
  }

  Search(){
    this.api.SearchCurrentAgents(this.search, this.userSesionInfo[0].id).subscribe(data =>{
      this.noResults = false 
      this.clientList = data
      
    },(response: HttpErrorResponse) => {
        
      if (response.status === 404) {
        this.noResults = true 
        console.log("Search result not found")
      }
      
  })
  }

}
