import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assign-course-modal',
  templateUrl: './assign-course-modal.component.html',
  styleUrls: ['./assign-course-modal.component.scss'],
})
export class AssignCourseModalComponent implements OnInit {

  //Variables
  allcourses
  assignedCourses
  course = "12"

  constructor(private modal: ModalController) { }

  ngOnInit() {
    console.log(this.allcourses)
    console.log(this.assignedCourses)
  }
  dismissModal()
  {
    this.modal.dismiss();
  }
}
