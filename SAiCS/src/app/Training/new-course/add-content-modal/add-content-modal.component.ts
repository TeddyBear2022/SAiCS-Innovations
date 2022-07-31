import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import {HttpClient,HttpResponse} from '@angular/common/http';



@Component({
  selector: 'app-add-content-modal',
  templateUrl: './add-content-modal.component.html',
  styleUrls: ['./add-content-modal.component.scss'],
})
export class AddContentModalComponent implements OnInit {

  AddContent:FormGroup;
  selectedFile = null
  isExisting: boolean = false
  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController,public toastController: ToastController, private fb: FormBuilder,) { }

  ngOnInit() {
    this.AddContent = this.fb.group
    ({
      contentsectionname:new FormControl('', Validators.required),
      estimatedduration:new FormControl('', Validators.required),
      uploadDocs:new FormControl('', Validators.required),
      UploadVids:new FormControl('', Validators.required),
      ContentSectionInfo:new FormControl('', Validators.required),
    });
  }
    dismissModal()
    {
      this.modal.dismiss();
    }
  }

 