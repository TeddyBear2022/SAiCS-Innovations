import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';
import {HttpClient,HttpResponse} from '@angular/common/http';
import { NewCourseVM } from 'src/app/Models/ViewModels/NewCourseVM';
import { SectionContent } from 'src/app/Models/SectionContent';



@Component({
  selector: 'app-add-content-modal',
  templateUrl: './add-content-modal.component.html',
  styleUrls: ['./add-content-modal.component.scss'],
})
export class AddContentModalComponent implements OnInit {
  //previous validator for google links: Validators.pattern("^(https:\/\/drive.google.com/drive)")]

  //Variables
  newContent;
  AddContent:FormGroup;
  sectionList
  requestType
  

  selectedFile = null
  isExisting: boolean = false
  constructor(private modal: ModalController, 
    private api:ApiService, 
    private alert: AlertController,
    public toastController: ToastController, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.AddContent = new FormGroup
    ({
      contentsectionname:new FormControl('', Validators.required),
      contentheading:new FormControl('', Validators.required),
      googledrivelink: new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^(https:\/\/drive.google.com\/drive)/)])),
      youtubevideoheading: new FormControl('', Validators.required),
      youtubeLink:new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)]))
    });
    console.log(this.requestType)
  }
 
    dismissModal()
    {
      // if(this.AddContent.invalid){

      // }
      this.modal.dismiss({newContent: this.newContent, sectionContentList: this.sectionList});
    }
    CreateContent(){
      if(this.AddContent.valid){
        let content:SectionContent = new SectionContent
        content.SectionName = this.AddContent.get(['contentsectionname']).value
        content.ContentHeading = this.AddContent.get(['contentheading']).value
        content.ContentLink = this.AddContent.get(['googledrivelink']).value
        content.YoutubeHeading = this.AddContent.get(['youtubevideoheading']).value
        content.YoutubeLink = this.AddContent.get(['youtubeLink']).value
        this.newContent = content
        
        if(this.requestType == "updateCourse"){
          content.CourseId = this.api.getCourseId()
            this.api.CreateSectionContent(content).subscribe(()=>
          {
            this.api.GetCourseSection(this.api.getCourseId()).subscribe(data=>
              {
                this.sectionList = data
                console.log(data)
                
                this.dismissModal()
              })
              
          })
        } 
        if(this.requestType == "newCourse"){
          this.dismissModal()
        }    
       
      }
      else{
        console.log('Invalid form')
      }
      
    }
  }

 