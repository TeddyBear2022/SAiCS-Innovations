import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbassadorAuthGuard implements CanLoad {

  constructor(private alert:AlertController, 
    private route:Router) {
    
  }

  canLoad() {
    const user = localStorage.getItem('UserRole');
    const isAuthenticated = !!(localStorage.getItem('token'));

    if(user == "Ambassador" && isAuthenticated == true){
      
      return true;

    }
    
    else{

      this.UnauthorizedNotif('You are not authorized to access this, only Ambassador users are allowed please login :-)','Unauthorized!')
      if(this.alert.dismiss){
        this.route.navigate(['home'])
      }
      return false;
    }
    
  }

  async UnauthorizedNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler: ()=> {
        this.route.navigate(['home'])
       
      }}]
    });

    await alert.present();
    
  }
}
