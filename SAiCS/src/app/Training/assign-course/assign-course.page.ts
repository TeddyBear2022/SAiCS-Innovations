import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalCustomEvent } from '@ionic/core';
import { AssignCourseModalComponent } from './assign-course-modal/assign-course-modal.component';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.page.html',
  styleUrls: ['./assign-course.page.scss'],
})
export class AssignCoursePage implements OnInit {

  constructor(private modal: ModalController,
    private menu:MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
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
