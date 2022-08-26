import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TemporaryStorage } from './Services/TemporaryStorage.service';

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
  constructor(private tmpStorage:TemporaryStorage, private nav:NavController) {
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
   
  
}
