import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import {HttpClient,HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.component.html',
  styleUrls: ['./banking-details.component.scss'],
})
export class BankingDetailsComponent implements OnInit {

  bankingdetails:FormGroup;
  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController,public toastController: ToastController, private fb: FormBuilder,) { 
  }
  ngOnInit() {}
  
  dismissModal()
  {
    this.modal.dismiss();
  }
}
