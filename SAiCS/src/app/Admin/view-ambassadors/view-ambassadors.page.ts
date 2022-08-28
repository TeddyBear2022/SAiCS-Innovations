import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-view-ambassadors',
  templateUrl: './view-ambassadors.page.html',
  styleUrls: ['./view-ambassadors.page.scss'],
})
export class ViewAmbassadorsPage implements OnInit {

  //Variables
  Ambassadors:any = []
  search:any
  noResults:boolean = false

  constructor(private popoverController:PopoverController, 
    private api:ApiService) { }

  ngOnInit() {
    this.api.ViewAllAmbassadors().subscribe(data =>
      {
        this.Ambassadors = data
        console.log(data);
        
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

  SearchAmbassador(event){
    // console.log(event.detail.value);
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }

  Search(){
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
      
  })}

  ClearSearch(){
    console.log("clear");
    this.noResults = false 
    this.api.ViewAllAmbassadors().subscribe(data =>
      {
        this.Ambassadors = data
        
      })
  }
}