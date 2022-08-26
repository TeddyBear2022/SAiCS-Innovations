import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-access-course',
  templateUrl: './access-course.page.html',
  styleUrls: ['./access-course.page.scss'],
})
export class AccessCoursePage implements OnInit {

  //Variables
  courses = []

  constructor(private menu:MenuController, 
    private api:ApiService, 
    private popoverController:PopoverController, 
    private route:Router) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    // this.menu.open('client-menu')

  }

  ionViewWillEnter(){
    this.api.AmbassadorAccessCourse().subscribe(data =>{
      this.courses = data
      console.log("Access course");
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

   AccessCourse(){
    console.log("Access course")
    this.route.navigate(['access-course-intro'])

   }

}
