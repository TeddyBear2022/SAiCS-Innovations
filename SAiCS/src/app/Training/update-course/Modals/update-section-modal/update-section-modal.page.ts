import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SectionContent } from 'src/app/Models/SectionContent';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-section-modal',
  templateUrl: './update-section-modal.page.html',
  styleUrls: ['./update-section-modal.page.scss'],
})
export class UpdateSectionModalPage implements OnInit {
  //Passing variables
  updateSection
  updateSectionList
  updateSectionIndex


  UpdateCourse:FormGroup;
  selectedFile = null
  isExisting: boolean = false
  constructor(private modal: ModalController, private api:ApiService, private alert: AlertController,public toastController: ToastController, private fb: FormBuilder,) { }

  ngOnInit() {
    console.log(this.updateSection, this.updateSectionList, this.updateSectionIndex)
    this.UpdateCourse = new FormGroup
    ({
      contentsectionname:new FormControl(this.updateSection.sectionName, Validators.required),
      contentheading:new FormControl(this.updateSection.contentHeading, Validators.required),
      googledrivelink: new FormControl(this.updateSection.contentLink, Validators.required),
      youtubevideoheading: new FormControl(this.updateSection.youtubeHeading, Validators.required),
      youtubeLink:new FormControl(this.updateSection.youtubeLink, Validators.required)
    });
  }
    dismissModal()
    {
      this.modal.dismiss();
    }
    Update(){
      if(this.UpdateCourse.invalid){
        
        console.log("Invalid form");
        
      }
      else{
        let updateSection:SectionContent = new SectionContent();
        updateSection.SectionContentId = this.updateSection.sectionContentId
        updateSection.SectionName = this.UpdateCourse.get(['contentsectionname']).value
        updateSection.ContentHeading = this.UpdateCourse.get(['contentheading']).value
        updateSection.ContentLink = this.UpdateCourse.get(['googledrivelink']).value
        updateSection.YoutubeHeading = this.UpdateCourse.get(['youtubevideoheading']).value
        updateSection.YoutubeLink = this.UpdateCourse.get(['youtubeLink']).value

        // this.api.UpdateSectionContent(updateSection).subscribe(data=>
        //   {
        //     console.log(data);
            
        //   })
        this.updateSectionList[this.updateSectionIndex].sectionName= this.UpdateCourse.get(['contentsectionname']).value
        this.updateSectionList[this.updateSectionIndex].sectionContentId= this.updateSection.sectionContentId
        this.updateSectionList[this.updateSectionIndex].ContentHeading = this.UpdateCourse.get(['contentheading']).value
        this.updateSectionList[this.updateSectionIndex].ContentLink = this.UpdateCourse.get(['googledrivelink']).value
        this.updateSectionList[this.updateSectionIndex].YoutubeHeading = this.UpdateCourse.get(['youtubevideoheading']).value
        this.updateSectionList[this.updateSectionIndex].YoutubeLink = this.UpdateCourse.get(['youtubeLink']).value
        
        console.log(this.updateSectionList);
        
      }

    }
}
