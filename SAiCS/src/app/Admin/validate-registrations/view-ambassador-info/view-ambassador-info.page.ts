import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-view-ambassador-info',
  templateUrl: './view-ambassador-info.page.html',
  styleUrls: ['./view-ambassador-info.page.scss'],
})
export class ViewAmbassadorInfoPage implements OnInit {

  //Variables 
  registrationInfo
  registrationFetched: boolean = false
  username

  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private route:Router, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.SpecificRegistration().subscribe(data => {
      this.registrationFetched =true
      this.registrationInfo =data
      console.log(data)
    })
    this.username = localStorage.getItem('UserName')
  }

  ionViewDidEnter(){
    this.api.SpecificRegistration().subscribe(data => {
      this.registrationInfo =data
      console.log(data)
      
    })
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

  Back(){
    this.route.navigate(['validate-registrations'])
  }

  DownloadIDFile() {
    console.log("Download file")
    const byteCharacters = atob(this.registrationInfo.ambassadors[0].idphoto);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    FileSaver.saveAs(
      blob,
      `${this.registrationInfo.name + ' '+ this.registrationInfo.surname}-IDPhotFile.pdf`
    );
  }

}
