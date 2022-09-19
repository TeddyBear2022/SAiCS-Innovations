import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-access-course-intro',
  templateUrl: './access-course-intro.page.html',
  styleUrls: ['./access-course-intro.page.scss'],
})
export class AccessCourseIntroPage implements OnInit {

  //Variables
  CourseDetails:FormGroup;
  courseDetails;
  course;
  sectionContent;
  ytVideo:boolean = false;
  youtubeVieo
  quiz=[];
  username

  constructor(public popoverController: PopoverController,
    private menu:MenuController, 
    private api:ApiService, 
    private route:Router) { }

  ngOnInit() {
    //menu bar
    this.menu.enable(true, 'ambassador-menu');

    //Form
    this.CourseDetails = new FormGroup({
      coursename: new FormControl(),
      courseDescription: new FormControl()
    })

    //Getting course details
    this.api.GetAccessCourseDetails().subscribe(data =>{
      console.log('access intro info', data);
      this.courseDetails = data
      this.course = this.courseDetails.course;
      this.sectionContent = this.courseDetails.sectionContent;
      this.quiz.push(this.courseDetails.quiz)
      console.log('quiz', this.quiz[0].quizName)
    })

    //Username
    this.username = localStorage.getItem('UserName')
  }

  ionViewWillEnter(){
    this.ytVideo= false;
    //Getting course details
    this.api.GetAccessCourseDetails().subscribe(data =>{
      console.log('access intro info', data);
      this.courseDetails = data
      this.course = this.courseDetails.course;
      this.sectionContent = this.courseDetails.sectionContent;
      this.quiz.push(this.courseDetails.quiz)
      console.log('quiz', this.quiz[0].quizName)
    })
  }

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }
  OpenYT(ytLink){

    console.log("open yt video",ytLink)
    this.youtubeVieo = ytLink
    this.ytVideo = true
  }
  Back(){
    this.route.navigate(['access-course'])
  }

  StartQuiz(){
    this.route.navigate(['start-quiz'])
  }
  openDrive(url){
    window.open(url, '_blank').focus();
  }
}
