import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { credentialsVM } from 'src/app/Models/ViewModels/credentialsVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { TemporaryStorage } from 'src/app/Services/TemporaryStorage.service';


@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  //Variables
  ambassadorsList:any= [];
  userSesionInfo =[];
  closeResult: string;
  noResults:boolean = false
  search:any= undefined
  username
  p;

  constructor(private tmpStorage:TemporaryStorage, 
    private api:ApiService,
    private menu:MenuController,
    private popoverController:PopoverController,
    private alert:AlertController,
    private route:Router,
    private cartService: CartService) { }

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

      this.username = localStorage.getItem('UserName')
  }

  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
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
    this.search= undefined
    let credentials:credentialsVM = new credentialsVM()
    credentials.userID = this.userSesionInfo[0].id
    this.api.ViewAmbassadors(credentials).subscribe(data =>
      {
        this.ambassadorsList = data
        
      })
  }

  Search(){
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
    this.api.SearchCurrentAgents(this.search, this.userSesionInfo[0].id).subscribe(data =>{
      this.noResults = false 
      this.ambassadorsList = data
      console.log(this.ambassadorsList)
      
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

   Import(){
    this.route.navigate(['view-ambassadors/import-ambassadors'])
    console.log("import")
   }
}
