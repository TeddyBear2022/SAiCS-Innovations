import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { Course } from 'src/app/Models/Course';
import { QuestionBank } from 'src/app/Models/QuestionBank';
import { Quiz } from 'src/app/Models/Quiz';
import { SectionContent } from 'src/app/Models/SectionContent';
import { NewCourseVM } from 'src/app/Models/ViewModels/NewCourseVM';
import { ApiService } from 'src/app/Services/api.service';
import { AddContentModalComponent } from '../new-course/add-content-modal/add-content-modal.component';
import { UpdateQuizModalPage } from './Modals/update-quiz-modal/update-quiz-modal.page';
import { UpdateSectionModalPage } from './Modals/update-section-modal/update-section-modal.page';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.page.html',
  styleUrls: ['./update-course.page.scss'],
})
export class UpdateCoursePage implements OnInit {

  //Variables
  courseDetails
  course
  sectionContent;
  quiz=[];
  questionBank=[];
  quizavailable= false
  courseUpdateDetails:FormGroup;
  courseName=[]
  courseDescription=[]
  
  constructor(private modal:ModalController,
    private menu:MenuController, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.GetCourseDetails().subscribe(data =>{
      // console.log(data);
      this.courseDetails = data
      this.course = this.courseDetails.course;
      for(var x=0; x<= this.courseDetails.questionBank.length-1; x++){
        this.questionBank.push(this.courseDetails.questionBank[x]);
      }
      this.quiz.push(this.courseDetails.quiz)
      this.sectionContent = this.courseDetails.sectionContent;
      // if(this.quiz != undefined){
      //   this.quizavailable = true
      // }
      this.courseName.push(this.course.courseName)
      this.courseDescription.push(this.course.description)
      
    })

    console.log(this.quiz);
    this.courseUpdateDetails = new FormGroup({
      updatecoursename: new FormControl(this.courseName, Validators.required),
      updatedescription: new FormControl(this.courseDescription, Validators.required)
    })
    console.log(this.questionBank);
    // console.log(this.courseDetails.course);
    
  }
  UpdateSection(sectionIndex){
    console.log(sectionIndex)
    this.updateSectionModal(sectionIndex);
  }
  DeleteSection(){
    console.log("Delete Section")
  }

  async updateSectionModal(sectionIndex)
  {
    
   const modals = await this.modal.create({
      component: UpdateSectionModalPage, 
      componentProps: {
        updateSection: this.sectionContent[sectionIndex],
        updateSectionList: this.sectionContent,
        updateSectionIndex: sectionIndex
      }

      // id: 'addquizClass',
    });
    modals.onDidDismiss().then(() => {
    
    })
     await modals.present();
  }
  UpdateCourse(){
    console.log(this.course.courseName);
  }
  updateSection(){
    this.updatesection()
  }
  async updatesection()
  {
   const modals = await this.modal.create({
      component: UpdateSectionModalPage,      
      id: 'addcontentClass',
    });
    modals.onDidDismiss().then((data) => {
      console.log(data);
        
    })
    return await modals.present();
  }

  UpdateQuiz(){
    this.updatequiz()
  }
  async updatequiz()
  {
   const modals = await this.modal.create({
      component: UpdateQuizModalPage,   
      componentProps: { 
        UpdateQuestionBankInfo: this.questionBank,
        UpdateQuizInfo: this.quiz[0]
      }   
      // id: 'addcontentClass',
    });
    modals.onDidDismiss().then((data) => {
      console.log(data);
        
    })
    return await modals.present();
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
    modals.onDidDismiss().then((data) => {
      // if(data.data.newContent != undefined){
      //   this.contents.push(data.data.newContent)
      // }
      // else{
      //   console.log("no content found");
      // }     
    })
    return await modals.present();
  }
}
