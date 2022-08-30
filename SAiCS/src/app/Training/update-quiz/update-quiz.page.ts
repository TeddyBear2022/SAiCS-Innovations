import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.page.html',
  styleUrls: ['./update-quiz.page.scss'],
})
export class UpdateQuizPage implements OnInit {

  UpdateQuiz:FormGroup;
  selectedFile = null
  isExisting: boolean = false

  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController,
    public toastController: ToastController, 
    private fb: FormBuilder,
    private menu:MenuController) { 
  }
  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.UpdateQuiz = this.fb.group({
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
