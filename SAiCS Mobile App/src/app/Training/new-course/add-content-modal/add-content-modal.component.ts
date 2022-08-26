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

  newContent;
  AddContent:FormGroup;
  sectionList
  

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
      googledrivelink: new FormControl('', Validators.required),
      youtubevideoheading: new FormControl('', Validators.required),
      youtubeLink:new FormControl('', Validators.required)
    });
  }
    dismissModal()
    {
      // if(this.AddContent.invalid){

      // }
      this.modal.dismiss({newContent: this.newContent, sectionContentList: this.sectionList});
    }
    CreateContent(){
      if(this.AddContent.valid){

        // console.log(this.AddContent.value)
        let content:SectionContent = new SectionContent
        content.SectionName = this.AddContent.get(['contentsectionname']).value
        content.ContentHeading = this.AddContent.get(['contentheading']).value
        content.ContentLink = this.AddContent.get(['googledrivelink']).value
        content.YoutubeHeading = this.AddContent.get(['youtubevideoheading']).value
        content.YoutubeLink = this.AddContent.get(['youtubeLink']).value
        //content.CourseId = this.api.getCourseId()
        this.newContent = content
        this.dismissModal()
                
        // this.api.CreateSectionContent(content).subscribe(()=>
        //   {
        //     this.api.GetCourseSection(this.api.getCourseId()).subscribe(data=>
        //       {
        //         this.sectionList = data
        //         // console.log(data)
        //         this.dismissModal()
        //       })
             
        //   })
      }
      else{
        console.log('Invalid form')
      }
      
    }
  }

 