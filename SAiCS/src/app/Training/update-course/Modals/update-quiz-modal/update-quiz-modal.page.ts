import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Course } from 'src/app/Models/Course';
import { QuestionBank } from 'src/app/Models/QuestionBank';
import { Quiz } from 'src/app/Models/Quiz';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-quiz-modal',
  templateUrl: './update-quiz-modal.page.html',
  styleUrls: ['./update-quiz-modal.page.scss'],
})
export class UpdateQuizModalPage implements OnInit {

  UpdateQuizInfo
  UpdateQuestionBankInfo
  questionSelected:boolean = false

  UpdateQuiz:FormGroup;
  UpdateQuestionBankForm:FormGroup
  newQuestionBankForm:FormGroup
  QuestionBankList = []
 quizError=false
  newQuiz
  updateOrDelete:NgModel
  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController,
    public toastController: ToastController, 
    private fb: FormBuilder,) { 
  }
  
  ngOnInit() {

    //Update Quiz Question
    this.UpdateQuestionBankForm = new FormGroup({
      updateordelete: new FormControl('Please choose an option'),
      updatequizquestion:new FormControl('', Validators.required),
      updatequizanswer:new FormControl('', Validators.required),
      updateoption1:new FormControl('', Validators.required),
      updateoption2:new FormControl('', Validators.required),
      updateoption3:new FormControl('', Validators.required),

      questionChosen:new FormControl(null)

    })

    //new Quiz Question Form
    this.newQuestionBankForm = new FormGroup({
      newquizquestion:new FormControl('', Validators.required),
      newquizanswer:new FormControl('', Validators.required),
      newoption1:new FormControl('', Validators.required),
      newoption2:new FormControl('', Validators.required),
      newoption3:new FormControl('', Validators.required),
    })

    //Update Quiz
    this.UpdateQuiz = new FormGroup({
      //Update or delete form fields
      //updateordelete: new FormControl('Please choose an option'),

      //New quiz questions form fields
      updatequizname:new FormControl(this.UpdateQuizInfo.quizName, Validators.required),
      // quizquestion:new FormControl('', Validators.required),
      // quizanswer:new FormControl('', Validators.required),
      // option1:new FormControl('', Validators.required),
      // option2:new FormControl('', Validators.required),
      // option3:new FormControl('', Validators.required),

      //update quiz questions form fields
      // updatequizquestion:new FormControl('', Validators.required),
      // updatequizanswer:new FormControl('', Validators.required),
      // updateoption1:new FormControl('', Validators.required),
      // updateoption2:new FormControl('', Validators.required),
      // updateoption3:new FormControl('', Validators.required),

      // questionChosen:new FormControl(null)
  });
}

AddToQuestionBank(){
  if(this.newQuestionBankForm.valid){

  //this.ListError= false
  let questionItem:QuestionBank = new QuestionBank
    questionItem.QuizId = this.UpdateQuizInfo.quizId
    questionItem.Questions = this.newQuestionBankForm.get(['newquizquestion']).value
    questionItem.Answers = this.newQuestionBankForm.get(['newquizanswer']).value
    questionItem.Option1 =this.newQuestionBankForm.get(['newoption1']).value
    questionItem.Option2 =this.newQuestionBankForm.get(['newoption2']).value
    questionItem.Option3 =  this.newQuestionBankForm.get(['newoption3']).value
  
    //TODO: send object to api
    this.api.CreateQuizQuestion(questionItem).subscribe(data => 
      {
        console.log(data);
        this.api.GetCourseQuestionBank(questionItem.QuizId).subscribe(data=>{
          this.UpdateQuestionBankInfo = data
          console.log(data);
          
        })
      })
    
    this.newQuestionBankForm.reset()
    this.UpdateQuestionBankForm.reset('questionChosen')
// this.QuestionBankList.push(questionItem)
  }
  else{
    //this.ListError=true

    console.log("invalid form");
  }
  
 
}
  dismissModal()
  {
    if(this.UpdateQuiz.invalid){
      this.newQuiz= {status:"false"}
    }
    this.modal.dismiss({updatedQuiz :this.UpdateQuizInfo });
  }

  UpdateQuestionBank(){
    if(this.UpdateQuestionBankForm.valid){
      console.log("update");

    //Update questionBank info on API
    let updateQuizQuestions:QuestionBank= new QuestionBank()
    updateQuizQuestions.QuestionBankId = this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].questionBankId
    updateQuizQuestions.Questions = this.UpdateQuestionBankForm.get(['updatequizquestion']).value
    updateQuizQuestions.Answers = this.UpdateQuestionBankForm.get(['updatequizanswer']).value
    updateQuizQuestions.Option1 = this.UpdateQuestionBankForm.get(['updateoption1']).value
    updateQuizQuestions.Option2 = this.UpdateQuestionBankForm.get(['updateoption2']).value
    updateQuizQuestions.Option3 = this.UpdateQuestionBankForm.get(['updateoption3']).value
    console.log(updateQuizQuestions);
    
    //TODO: send object to api
    this.api.UpdateQuizQuestion(updateQuizQuestions).subscribe(data=> 
      {
        console.log(data)
        this.api.GetCourseQuestionBank(this.UpdateQuizInfo.quizId).subscribe(data=>{
          this.UpdateQuestionBankInfo = data
          console.log(data);
          
        })
      })
    }
    else{
      console.log("invalid update form");
      
    }
  }

  //can remove was just for testing
  UpdateDeleteOption(){
    console.log(this.UpdateQuestionBankForm.get(['updateordelete']).value);
    
  }

  QuestionChosen(){
    this.questionSelected = true
    this.UpdateQuestionBankForm.patchValue({
      updatequizquestion: this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].questions,
      updatequizanswer:this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].answers,
      updateoption1:this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].option1,
      updateoption2:this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].option2,
      updateoption3:this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].option3,
    })
  }

  Update(){
    if(this.QuestionBankList.length == 0){
      this.alertNotif("You need to have atleast one question for your quiz!","Oops")
    }

    if(this.UpdateQuiz.valid && this.QuestionBankList.length != 0){
    this.quizError= false
    let updateQuiz:Quiz = new Quiz()
    updateQuiz.QuizName= this.UpdateQuiz.get(['updatequizname']).value
    updateQuiz.QuizId = this.UpdateQuizInfo.quizId
    console.log(updateQuiz);
    this.api.UpdateQuiz(updateQuiz).subscribe(data =>
      {
        this.api.GetCourseQuiz(this.api.getCourseId()).subscribe(data=>
          {
            this.UpdateQuizInfo =  data
            this.dismissModal()
          })
        
      })
    }
    else{
      this.quizError = true
      console.log("Invalid form");
      
    }
    
    
  }
  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

  DeleteCourseQuestion(){
    console.log(this.UpdateQuestionBankInfo)
    console.log(this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].questionBankId)
    this.api.DeleteCourseQuestion(this.UpdateQuestionBankInfo[this.UpdateQuestionBankForm.get(['questionChosen']).value].questionBankId).subscribe(data =>{
      console.log(data)
      this.UpdateQuestionBankForm.reset('questionChosen')
      // this.UpdateQuestionBankForm.reset('questionChosen')
      // this.UpdateQuestionBankInfo.splice(this.UpdateQuestionBankForm.get(['questionChosen']).value,1)
      this.api.GetCourseQuestionBank(this.UpdateQuizInfo.quizId).subscribe(data=>{
        this.UpdateQuestionBankInfo = data
        console.log(data);
        
      })
      console.log(this.UpdateQuestionBankInfo)
    }
    )
  }

}
