import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';


@Component({
  selector: 'app-view-ambassador',
  templateUrl: './view-ambassador.page.html',
  styleUrls: ['./view-ambassador.page.scss'],
})
export class ViewAmbassadorPage implements OnInit {

  constructor(public popoverController: PopoverController, private api: ApiService){}

  myAmbssador = []
  allAmbassador = []
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }


  ngOnInit() {
    this.MyAmbassador()
    this.GetAllAmbassadors()
  }

  MyAmbassador()
  {
     this.api.MyAmbassador(1).subscribe(data => {
       this.myAmbssador = data
       console.log(this.myAmbssador)
     }
   )
  }

  GetAllAmbassadors()
  {
    this.api.GetAllAmbassadors().subscribe(data =>{
      this.allAmbassador = data
      console.log(this.allAmbassador)
    })
  }

}
