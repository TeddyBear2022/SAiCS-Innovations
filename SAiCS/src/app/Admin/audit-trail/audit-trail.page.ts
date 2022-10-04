import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.page.html',
  styleUrls: ['./audit-trail.page.scss'],
})
export class AuditTrailPage implements OnInit {

  //Variables
  auditTrails
  search = undefined
  noResults:boolean = false
  username
  p;

  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private api:ApiService,
    private alert:AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.AuditTrailData()
    this.username = localStorage.getItem('UserName')
  }
  AuditTrailData(){
    this.api.AuditTrail().subscribe(data => {
      this.auditTrails = data
      console.log(data)
    })
  }
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  Filter(event){
    if(event.detail.value == "Select A Transaction Type")(
      this.AuditTrailData()
    )
    this.api.AuditTrailByTransactionType(event.detail.value).subscribe(data => {
      console.log(data)
      this.auditTrails = data
    })
    if(event.detail.value == "Select A Transaction Type")(
      this.AuditTrailData()
    )
    console.log(event.detail.value);
    
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  Search(){
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
      console.log("search...",this.search)
      this.api.AuditTrailByTransactionType(this.search).subscribe(data =>{
        this.noResults = false 
        this.auditTrails = data
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
    this.AuditTrailData()
  }

  SearchTerm(event){
    // console.log(event.detail.value);
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }

}
