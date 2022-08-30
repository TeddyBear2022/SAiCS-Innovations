import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assign-course-modal',
  templateUrl: './assign-course-modal.component.html',
  styleUrls: ['./assign-course-modal.component.scss'],
})
export class AssignCourseModalComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}
  dismissModal()
  {
    this.modal.dismiss();
  }
}
