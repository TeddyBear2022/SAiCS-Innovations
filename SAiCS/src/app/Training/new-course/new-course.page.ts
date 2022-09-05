import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController, MenuController, ModalController, PopoverController} from '@ionic/angular';
import { Course } from 'src/app/Models/Course';
import { Quiz } from 'src/app/Models/Quiz';
import { Section } from 'src/app/Models/Section';
import { NewCourseVM } from 'src/app/Models/ViewModels/NewCourseVM';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AddContentModalComponent } from './add-content-modal/add-content-modal.component';
import { AddQuizModalComponent } from './add-quiz-modal/add-quiz-modal.component';
@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.page.html',
  styleUrls: ['./new-course.page.scss'],
})
export class NewCoursePage implements OnInit {

  //Variables
  contents=[]
  quiz:Quiz;
  questionbank=[]
  courseDetails:FormGroup;
  quizCreated:boolean = false
  //sectionCreated:boolean = false

  constructor(private modal: ModalController,
  private menu:MenuController,
  private api:ApiService,
  private alert:AlertController, 
  private router:Router, 
  private popoverController:PopoverController) { }

  ngOnInit() {
    //Menu items
    this.menu.enable(true, 'admin-menu');

    //Form
    this.courseDetails = new FormGroup({
      coursename: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler: ()=> { 
        this.router.navigate(['course-studio'])
      }}]
    });

    await alert.present();
  }

  //Creating a quiz
 AddQuiz(){
  this.addquiz()
 }
  async addquiz()
  {
   const modals = await this.modal.create({
      component: AddQuizModalComponent
    });
    modals.onDidDismiss().then((data) => {
      if(data.data.newQuiz.status == "true"){
        let quiz:Quiz = new Quiz()
        quiz.QuizName = data.data.newQuiz.quizname
        this.quiz = quiz
        for(var x=0;x<=data.data.newQuiz.questions.length-1; x++){
          this.questionbank.push(data.data.newQuiz.questions[x])
        }
        
        console.log(this.questionbank);
        
      this.quizCreated = true
      }
      else{
        this.quizCreated = false
        console.log("Quiz not creared"); 
      }
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
      componentProps: {requestType: "newCourse"}
    });
    modals.onDidDismiss().then((data) => {
      if(data.data.newContent != undefined){
        this.contents.push(data.data.newContent)
      }
      else{
        console.log("no content found");
      }     
    })
    return await modals.present();
  }

  CreateCourse(){
    //Valid form
    if(this.quiz != null && this.contents.length>=1 && this.courseDetails.valid){
      let newCourse:NewCourseVM= new NewCourseVM
      
      //New Course
      let course:Course = new Course();
      course.CourseName =  this.courseDetails.get(['coursename']).value
      course.Description = this.courseDetails.get(['description']).value
      newCourse.Course = course
      newCourse.SectionContent=this.contents
      newCourse.QuestionBank = this.questionbank
      newCourse.Quiz = this.quiz

      console.log(newCourse);
      this.api.CreateCourse(newCourse).subscribe(data=>
        {
          if(data == true){
            this.alertNotif("Course was successfully created", "Success")
          }
          console.log(data);
          
        },(response: HttpErrorResponse) => {
        
          if (response.status === 400){
            this.alertNotif("Something went wrong! please try again later","Oops")
          }
          if (response.status === 404){
            this.alertNotif("The course you created already exists! Please try making a new course that doesn't exist","Oops")
          }
          
        }
        )
    }

    //Invalid form 
    else{
      console.log("invalid, can't create quiz");
    }
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

   Back(){
    this.router.navigate(['course-studio'])
   }
 
}