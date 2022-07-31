import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCustomEvent } from '@ionic/core';
import { AssignCourseModalComponent } from './assign-course-modal/assign-course-modal.component';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.page.html',
  styleUrls: ['./assign-course.page.scss'],
})
export class AssignCoursePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }
  AssignCourse(){
    this.assigncourse()
   }
  async assigncourse()
  {
   const modals = await this.modal.create({


      component: AssignCourseModalComponent,     
      cssClass:'small-modal'
    });
    modals.onDidDismiss().then(() => {
    
    })
    return await modals.present();
  }

}
