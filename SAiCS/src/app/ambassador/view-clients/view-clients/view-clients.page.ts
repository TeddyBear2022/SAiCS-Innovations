import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { credentialsVM } from 'src/app/Models/ViewModels/credentialsVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
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
    private menu:MenuController,
    private popoverController:PopoverController,
    private alert:AlertController) { }

  //Variables
  clientList;
  noResults:boolean = false
  search:any = undefined
  userSesionInfo = [];
  username
  
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
    this.username = localStorage.getItem('UserName')
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
    this.api.ViewClients().subscribe(data=> 
      {
        this.clientList = data
        console.log(this.clientList)
      })
  }

  Search(){
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
    this.api.SearchCurrentClients(this.search, this.userSesionInfo[0].id).subscribe(data =>{
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

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

}
