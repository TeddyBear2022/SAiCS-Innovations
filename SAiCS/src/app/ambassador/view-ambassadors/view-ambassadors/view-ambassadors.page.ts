import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { credentialsVM } from 'src/app/Models/ViewModels/credentialsVM';
import { ApiService } from 'src/app/Services/api.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  
  ambassadorsList:any= [];
  userSesionInfo =[];
  closeResult: string;
  noResults:boolean = false
  search:any

  constructor(private tmpStorage:TemporaryStorage, 
    private api:ApiService,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');

    //Get ambassadors info
    this.userSesionInfo = this.tmpStorage.getSessioninfo();
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    
    this.api.ViewAmbassadors(credentials).subscribe(data=> 
      {
        this.ambassadorsList = data
        console.log(data)     
      })
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
    this.api.ViewAmbassadors(credentials).subscribe(data =>
      {
        this.ambassadorsList = data
        
      })
  }

  Search(){
    this.api.SearchCurrentAgents(this.search, this.userSesionInfo[0].id).subscribe(data =>{
      this.noResults = false 
      this.ambassadorsList = data
      
    },(response: HttpErrorResponse) => {
        
      if (response.status === 404) {
        this.noResults = true 
        console.log("Search result not found")
      }
      
  })
  }
}
