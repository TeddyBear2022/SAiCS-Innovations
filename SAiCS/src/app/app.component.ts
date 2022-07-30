import { Component } from '@angular/core';
import { TemporaryStorage } from './Services/TemporaryStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
 
export class AppComponent {
  userRole:number;
  constructor(private tmpStorage:TemporaryStorage) {
    let sessioninfo = this.tmpStorage.getSessioninfo()
    // let userrole = sessioninfo[0].userRoleID 
    this.userRole = 2 
    console.log(this.userRole+" this is the user role")
    console.log('test')
  }
  ionViewDidLeave(){
   
  }
  
}
