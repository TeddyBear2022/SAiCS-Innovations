import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
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
  sectionContent:any = [];
  quiz=[];
  questionBank=[];
  quizavailable= false
  courseUpdateDetails:FormGroup;
  courseName=[]
  courseDescription=[]
  
  constructor(private modal:ModalController,
    private menu:MenuController, 
    private api:ApiService, 
    private router:Router, 
    private alert:AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.GetCourseDetails().subscribe(data =>{
      console.log(data);
      this.courseDetails = data
      this.course = this.courseDetails.course;
      for(var x=0; x <= this.courseDetails.questionBank.length-1; x++){
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
// console.log(this.courseName);

    // console.log(this.quiz);
    this.courseUpdateDetails = new FormGroup({
      updatecoursename: new FormControl(this.courseName, Validators.required),
      updatedescription: new FormControl(this.courseDescription, Validators.required)
    })
    // console.log(this.questionBank);
    // console.log(this.courseDetails.course);
    
  }
  UpdateSection(sectionIndex){
    console.log(sectionIndex)
    this.updateSectionModal(sectionIndex);
  }
  DeleteSection(index:number){
    console.log("Delete Section", index)
    this.alertNotif("", "Are you sure you want to delete this section?", index)
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
    modals.onDidDismiss().then((data) => {
    // console.log(data.data.updatedSection);
    this.sectionContent = data.data.updatedSection
    })
     await modals.present();
  }

  UpdateCourse(){
    if(this.courseUpdateDetails.valid && this.sectionContent.length != 0){
      let UpdateCourse:Course= new Course();
      let coursenameArray = this.courseUpdateDetails.get(['updatecoursename']).value
      UpdateCourse.CourseName=coursenameArray.toString()
      let courseDescriptionArray =  this.courseUpdateDetails.get(['updatedescription']).value
      UpdateCourse.Description =  courseDescriptionArray.toString()
      UpdateCourse.CourseId = this.api.getCourseId()
      console.log(UpdateCourse);
      this.api.UpdateCourse(UpdateCourse).subscribe(data=>
        {
          if(data == true){
            this.router.navigate(['course-studio'])
          }
          else{
          console.log("Invalid error");
          
          }
        })
    }
    else{
      console.log("invalid update course");
      
    }
 
  }

  async alertNotif(header:string, message:string, index:number) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'Yes', handler: ()=>{
       this.api.DeleteSectionContent(this.sectionContent[index].sectionContentId).subscribe(data=>
        {
          this.api.GetCourseSection(this.api.getCourseId()).subscribe(data=>
            {
              this.sectionContent = data              
            })
          console.log(data);
        }) 
      }}, {text:'No'}],
    });

    await alert.present();
  }
  updateSection(){
    this.updatesection()
  }
  async updatesection()
  {
   const modals = await this.modal.create({
      component: UpdateSectionModalPage,      
      // id: 'addcontentClass',
    });
    modals.onDidDismiss().then((data) => {
      console.log("data.data.updatedSection");
        
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
      console.log(data.data.updatedQuiz);
      this.quiz = []
        this.quiz.push(data.data.updatedQuiz)
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
      componentProps: {requestType: "updateCourse"}
    });
    modals.onDidDismiss().then((data) => {
      console.log(data)
      if(data.data.sectionContentList == undefined){
        console.log("Modal closed")
      }
      else{
        this.sectionContent = data.data.sectionContentList
      console.log('section content from update course', data.data.sectionContentList)
      // console.log( data.data.sectionContentList);
      }
      
          
    })
    return await modals.present();
  }
  Back(){
    this.router.navigate(['course-studio'])
   }
 
}
