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
  QuestionBankList = []
  ListError=false
  newQuiz
  updateOrDelete:NgModel
  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController,
    public toastController: ToastController, 
    private fb: FormBuilder,) { 
  }
  ngOnInit() {
    this.UpdateQuestionBankInfo
    this.UpdateQuizInfo

    this.UpdateQuiz = new FormGroup({
      //Update or delete form fields
      updateordelete: new FormControl('Please choose an option'),

      //New quiz questions form fields
      quizname:new FormControl(this.UpdateQuizInfo.quizName, Validators.required),
      quizquestion:new FormControl('', Validators.required),
      quizanswer:new FormControl('', Validators.required),
      option1:new FormControl('', Validators.required),
      option2:new FormControl('', Validators.required),
      option3:new FormControl('', Validators.required),

      //update quiz questions form fields
      updatequizquestion:new FormControl('', Validators.required),
      updatequizanswer:new FormControl('', Validators.required),
      updateoption1:new FormControl('', Validators.required),
      updateoption2:new FormControl('', Validators.required),
      updateoption3:new FormControl('', Validators.required),

      questionChosen:new FormControl(null)
  });
}

AddToQuestionBank(){
  if(this.UpdateQuiz.get(['quizquestion']).value !='' ||
  this.UpdateQuiz.get(['quizanswer']).value !=''||
  this.UpdateQuiz.get(['option1']).value !='' ||
  this.UpdateQuiz.get(['option2']).value !='' ||
  this.UpdateQuiz.get(['option3']).value !=''){
    this.ListError= false

    //Add new questionBank information to API
  // let newQuestionBankItem:{
  //   question:string, 
  //   answer:string,
  //   option1:string,
  //   option2:string,
  //   option3:string
  // } = {
  // question :this.UpdateQuiz.get(['quizquestion']).value,
  // answer:this.UpdateQuiz.get(['quizanswer']).value,
  // option1:this.UpdateQuiz.get(['option1']).value,
  // option2:this.UpdateQuiz.get(['option2']).value,
  // option3: this.UpdateQuiz.get(['option3']).value
  // }
  let questionItem:QuestionBank = new QuestionBank
    questionItem.Questions = this.UpdateQuiz.get(['quizquestion']).value
    questionItem.Answers = this.UpdateQuiz.get(['quizanswer']).value
    questionItem.Option1 =this.UpdateQuiz.get(['option1']).value
    questionItem.Option2 =this.UpdateQuiz.get(['option2']).value
    questionItem.Option3 =  this.UpdateQuiz.get(['option3']).value
  
    console.log(questionItem);
    
    //TODO: send object to api
// this.QuestionBankList.push(questionItem)
  }
  else{
    this.ListError=true
    console.log("invalid form");
  }
  
 
}
  dismissModal()
  {
    if(this.UpdateQuiz.invalid){
      this.newQuiz= {status:"false"}
    }
    this.modal.dismiss({newQuiz :this.newQuiz, });
  }

  CreateQuiz(){
    if(this.QuestionBankList.length>=1 && this.UpdateQuiz.get(['quizname']).value != ''){
      this.newQuiz= {status:"true", quizname: this.UpdateQuiz.get(['quizname']).value, 
      questions: this.QuestionBankList}
      this.dismissModal()
      console.log("quiz")
    }
    else{
      console.log("invalid")
    }
    // console.log("create quiz");
    
    // console.log(this.QuestionBankList.length)
  }
  UpdateQuestionBank(){
    console.log("update");

    //Update questionBank info on API
    let updateQuizQuestions:QuestionBank= new QuestionBank()
    updateQuizQuestions.QuestionBankId = this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].questionBankId
    updateQuizQuestions.Questions = this.UpdateQuiz.get(['updatequizquestion']).value
    updateQuizQuestions.Answers = this.UpdateQuiz.get(['updatequizanswer']).value
    updateQuizQuestions.Option1 = this.UpdateQuiz.get(['updateoption1']).value
    updateQuizQuestions.Option2 = this.UpdateQuiz.get(['updateoption2']).value
    updateQuizQuestions.Option3 = this.UpdateQuiz.get(['updateoption3']).value
    console.log(updateQuizQuestions);
    
    //TODO: send object to api
  }

  //can remove was just for testing
  UpdateDeleteOption(){
    console.log(this.UpdateQuiz.get(['updateordelete']).value);
    
  }
  QuestionChosen(){
    this.questionSelected = true
    // console.log(this.UpdateQuiz.get(['questionChosen']).value);
    
    this.UpdateQuiz.patchValue({
      updatequizquestion: this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].questions,
      updatequizanswer:this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].answers,
      updateoption1:this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].option1,
      updateoption2:this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].option2,
      updateoption3:this.UpdateQuestionBankInfo[this.UpdateQuiz.get(['questionChosen']).value].option3,
    })
  }
  Update(){
    let updateQuiz:Quiz = new Quiz()
    updateQuiz.QuizName= this.UpdateQuiz.get(['quizname']).value
    console.log(updateQuiz);
    
  }

}
