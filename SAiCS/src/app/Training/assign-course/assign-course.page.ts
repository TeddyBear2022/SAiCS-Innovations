import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { ModalCustomEvent } from '@ionic/core';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AssignCourseModalComponent } from './assign-course-modal/assign-course-modal.component';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.page.html',
  styleUrls: ['./assign-course.page.scss'],
})
export class AssignCoursePage implements OnInit {

  //Variables
  ambassadorsEnrollments:any = []
  courses:any = []
  assignedCourses=['11', '12', '13']
  username

  constructor(private modal: ModalController,
    private menu:MenuController, 
    private api:ApiService, 
    private popoverController:PopoverController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.AssignCourseData().subscribe(data => {
      this.ambassadorsEnrollments = data
      console.log(data)
    })
    this.username = localStorage.getItem('UserName')
  }
ionViewDidEnter(){
  this.api.AssignCourseData().subscribe(data => {
    this.ambassadorsEnrollments = data
    console.log(data)
  })
  this.api.GetAllCourses().subscribe(data =>{
    // this.courses.push(data);
    this.courses = data
    console.log(data);
    
  })
  this.username = localStorage.getItem('UserName')
}

  AssignCourse(){
    this.assigncourse()
   }
  async assigncourse()
  {
   const modals = await this.modal.create({
      component: AssignCourseModalComponent,     
      cssClass:'small-modal',
      componentProps:{ allcourses: this.courses, assignedCourses: this.ambassadorsEnrollments.enrolled}
    });
    modals.onDidDismiss().then(() => {
    
    })
    return await modals.present();
  }

  Format(event){
    console.log(event.detail.value)
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

}
