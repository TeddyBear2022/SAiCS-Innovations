import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-course-studio',
  templateUrl: './course-studio.page.html',
  styleUrls: ['./course-studio.page.scss'],
})
export class CourseStudioPage implements OnInit {

  //Variables
  courses = []

  constructor(private router:Router, 
    private alert:AlertController,
    private menu:MenuController, 
    private api:ApiService) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    this.api.GetAllCourses().subscribe(data =>{
      // this.courses.push(data);
      this.courses = data
      console.log(data);
      
    })
  }

  UpdateCourse(id:number){
    console.log(id);
    this.api.setCourseId(id)
    this.router.navigate(['update-course']);
  }

  DeleteCourse(){
    this.alertNotif("Are you sure you want to delete this course?", "")
    console.log("Delete")
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
