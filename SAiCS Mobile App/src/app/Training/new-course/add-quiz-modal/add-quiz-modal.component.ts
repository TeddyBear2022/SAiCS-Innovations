import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import {HttpClient,HttpResponse} from '@angular/common/http';
import { QuizSessionPage } from '../../quiz-session/quiz-session.page';
import { QuestionBank } from 'src/app/Models/QuestionBank';

@Component({
  selector: 'app-add-quiz-modal',
  templateUrl: './add-quiz-modal.component.html',
  styleUrls: ['./add-quiz-modal.component.scss'],
})
export class AddQuizModalComponent implements OnInit {

  AddQuiz:FormGroup;
  QuestionBankList = []
  ListError=false
  newQuiz

  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController,
    public toastController: ToastController, 
    private fb: FormBuilder,) { 
  }
  ngOnInit() {
    this.AddQuiz = new FormGroup({
      quizname:new FormControl('', Validators.required),
      quizquestion:new FormControl('', Validators.required),
      quizanswer:new FormControl('', Validators.required),
      option1:new FormControl('', Validators.required),
      option2:new FormControl('', Validators.required),
      option3:new FormControl('', Validators.required),
  });
}

AddToQuestionBank(){
  if(this.AddQuiz.get(['quizquestion']).value !='' ||
  this.AddQuiz.get(['quizanswer']).value !=''||
  this.AddQuiz.get(['option1']).value !='' ||
  this.AddQuiz.get(['option2']).value !='' ||
  this.AddQuiz.get(['option3']).value !=''){
    this.ListError= false
  let newQuestionBankItem:{
    question:string, 
    answer:string,
    option1:string,
    option2:string,
    option3:string
  } = {
  question :this.AddQuiz.get(['quizquestion']).value,
  answer:this.AddQuiz.get(['quizanswer']).value,
  option1:this.AddQuiz.get(['option1']).value,
  option2:this.AddQuiz.get(['option2']).value,
  option3: this.AddQuiz.get(['option3']).value
  }
  let questionItem:QuestionBank = new QuestionBank
    questionItem.Questions = this.AddQuiz.get(['quizquestion']).value
    questionItem.Answers = this.AddQuiz.get(['quizanswer']).value
    questionItem.Option1 =this.AddQuiz.get(['option1']).value
    questionItem.Option2 =this.AddQuiz.get(['option2']).value
    questionItem.Option3 =  this.AddQuiz.get(['option3']).value
  
this.QuestionBankList.push(questionItem)
  }
  else{
    this.ListError=true
    console.log("invalid form");
  }
  
 
}
  dismissModal()
  {
    if(this.AddQuiz.invalid){
      this.newQuiz= {status:"false"}
    }
    this.modal.dismiss({newQuiz :this.newQuiz, });
  }

  CreateQuiz(){
    if(this.QuestionBankList.length>=1 && this.AddQuiz.get(['quizname']).value != ''){
      this.newQuiz= {status:"true", quizname: this.AddQuiz.get(['quizname']).value, 
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
}
