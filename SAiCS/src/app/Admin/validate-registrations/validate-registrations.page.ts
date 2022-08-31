import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-validate-registrations',
  templateUrl: './validate-registrations.page.html',
  styleUrls: ['./validate-registrations.page.scss'],
})
export class ValidateRegistrationsPage implements OnInit {

  registrations:any = []

  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private api:ApiService, 
    private route:Router) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');

    this.api.AllRegistrations().subscribe(data => {
      console.log(data)
    })
  }

  ionViewDidEnter(){
    this.api.AllRegistrations().subscribe(data => {
      console.log(data)
      this.registrations = data
    })
  }

  Search(){

  }
  SearchAmbassador(event){
    
  }
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  ViewRegistration(id:string){
    console.log(id);
    localStorage.setItem('registrationRequest', id)
    this.route.navigate(['validate-registrations/view-ambassador-info'])
  }
}
