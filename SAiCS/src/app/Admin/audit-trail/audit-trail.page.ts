import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
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
  constructor(private popoverController:PopoverController, 
    private menu:MenuController, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.AuditTrailData()
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

}
