import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AddContentModalComponent } from './add-content-modal/add-content-modal.component';
import { AddQuizModalComponent } from './add-quiz-modal/add-quiz-modal.component';
@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.page.html',
  styleUrls: ['./new-course.page.scss'],
})
export class NewCoursePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

 AddQuiz(){
  this.addquiz()
 }
  async addquiz()
  {
    
   const modals = await this.modal.create({
      component: AddQuizModalComponent,      
      // id: 'addquizClass',
    });
    modals.onDidDismiss().then(() => {
    
    })
     await modals.present();
  }
  AddContent(){
    this.addcontent()
   }
  async addcontent()
  {
   const modals = await this.modal.create({


      component: AddContentModalComponent,      
      id: 'addcontentClass',
    });
    modals.onDidDismiss().then(() => {
    
    })
    return await modals.present();
  }

 
}