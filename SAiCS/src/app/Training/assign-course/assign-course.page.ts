import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { ModalCustomEvent } from '@ionic/core';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { AssignCourseModalComponent } from './assign-course-modal/assign-course-modal.component';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.page.html',
  styleUrls: ['./assign-course.page.scss'],
})
export class AssignCoursePage implements OnInit {

  //Variables
  ambassadorsEnrollments:any = []
  courses:any = []
  assignedCourses=['1015', '13']
  username

  //revamped
  courseAssignedData:any = []
  constructor(private modal: ModalController,
    private menu:MenuController, 
    private api:ApiService, 
    private popoverController:PopoverController,
    private alert:AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    // this.api.AssignCourseData().subscribe(data => {
    //   this.ambassadorsEnrollments = data
    //   console.log(data)
    // })

    this.Data()

    this.username = localStorage.getItem('UserName')
  }
ionViewDidEnter(){
  // this.api.AssignCourseData().subscribe(data => {
  //   this.ambassadorsEnrollments = data
  //   console.log(data)
  // })
  this.api.GetAllCourses().subscribe(data =>{
    // this.courses.push(data);
    this.courses = data
    console.log(data);
    
  })
  this.username = localStorage.getItem('UserName')
}
  Data(){
    this.api.AssignCourseInfo().subscribe(data => {
      this.courseAssignedData = data
      console.log(data)
    })
  }

  AssignCourse(){
    this.assigncourse()
   }
  async assigncourse()
  {
   const modals = await this.modal.create({
      component: AssignCourseModalComponent,     
      cssClass:'small-modal',
      componentProps:{ allcourses: this.courses, assignedCourses: this.ambassadorsEnrollments.enrolled}
    });
    modals.onDidDismiss().then(() => {
    
    })
    return await modals.present();
  }


  Assign(event, ranking){
    console.log(event.detail.value)
    let rankingInfo = ranking
    rankingInfo.updateCourse = event.detail.value
    console.log(rankingInfo)
    this.api.AssignCourse(rankingInfo).subscribe(data =>{
      if(data == true){
        this.alertNotif("Course(s) were successfully assigned","")
      }
      if(data != true){
        this.alertNotif("Something went wrong, please try ahain later","Oops")
      }
      console.log(data)
    })
  }

  // Show Profile optionss when icon on right of navbar clicked function
  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

}
