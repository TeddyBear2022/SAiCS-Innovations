import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';

@Component({
  selector: 'app-access-course-intro',
  templateUrl: './access-course-intro.page.html',
  styleUrls: ['./access-course-intro.page.scss'],
})
export class AccessCourseIntroPage implements OnInit {

  //Variables
  CourseDetails:FormGroup
  constructor(public popoverController: PopoverController,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    this.CourseDetails = new FormGroup({
      coursename: new FormControl(),
      courseDescription: new FormControl()
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
}
