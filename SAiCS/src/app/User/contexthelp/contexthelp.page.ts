import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-contexthelp',
  templateUrl: './contexthelp.page.html',
  styleUrls: ['./contexthelp.page.scss'],
})
export class ContexthelpPage implements OnInit {

  //variables
  keyword
  type
  Help
  context
  otherHelp
  search:any = undefined
  noResults:boolean = false

  constructor(private api:ApiService,
    private modal:ModalController,
    private alert:AlertController) { }

  ngOnInit() {
    this.Data()
  }

  Data(){
    this.api.ContextHelp(this.keyword,this.type).subscribe(data =>
      {
        this.Help = data
        this.context = this.Help.contextHelp
        this.otherHelp = this.Help.otherHelp
        console.log(this.context, this.otherHelp)
      })
  }
  Close(){
    this.modal.dismiss()

  }

  Search(){
    if(this.search == undefined){
      console.log("No search in the box...")
      this.alertNotif("Please enter something in the search box", "")
    }
    if(this.search != undefined){
      console.log("search...",this.search)
      this.api.SearchHelp(this.search,this.type,0).subscribe(data =>{
        this.noResults = false 
        this.otherHelp = data
        console.log(data)
        
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
    this.Data()
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  Keywords(event){
    // console.log(event.detail.value);
    this.search = event.detail.value
    if(this.search == ''){
      this.ClearSearch()
    }
  }
}
