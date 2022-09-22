import { Component, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TemporaryStorage } from './Services/TemporaryStorage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
 
export class AppComponent {

  GetChildData(data){  
    console.log(data);  
 } 

  userRole:number;
  chatbotLink: string;
  chatId:number;
  
  constructor(private tmpStorage:TemporaryStorage, private nav:NavController, @Inject(DOCUMENT) private document: Document) {
    let sessioninfo = this.tmpStorage.getSessioninfo()
    // let userrole = sessioninfo[0].userRoleID 
    this.userRole =  3
    console.log(this.userRole+" this is the user role")
    console.log('test')
  }
  ngOnInit(){
    console.log("ngOnInit ");
    // this.nav.setRoot()
    
  }

  onHelp(user: string)
  {
    switch (user) {
      case "Client":
          // this.chatId = 271997
           (this.document as any).chatId = 271997
          break;
      case "Admin":
          console.log("It is a Monday.");
          break;
      default:
          console.log("No such day exists!");
          break;
  }
  }
   
  
}
