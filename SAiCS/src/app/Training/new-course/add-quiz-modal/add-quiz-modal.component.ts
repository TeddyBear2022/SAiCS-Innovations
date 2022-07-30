import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import {HttpClient,HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-quiz-modal',
  templateUrl: './add-quiz-modal.component.html',
  styleUrls: ['./add-quiz-modal.component.scss'],
})
export class AddQuizModalComponent implements OnInit {

  AddQuiz:FormGroup;
  selectedFile = null
  isExisting: boolean = false

  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController,public toastController: ToastController, private fb: FormBuilder,) { 
  }
  ngOnInit() {
    this.AddQuiz = this.fb.group({
      quizname:new FormControl('', Validators.required),
      quizquestion:new FormControl('', Validators.required),
      quizanswer:new FormControl('', Validators.required),
      otheroptions:new FormControl('', Validators.required),
  });
}
  dismissModal()
  {
    this.modal.dismiss();
  }
}
