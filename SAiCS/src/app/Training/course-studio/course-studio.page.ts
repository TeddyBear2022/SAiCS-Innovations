import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
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
    private api:ApiService, 
    private popoverController:PopoverController) { }

  ngOnInit() {
    this.menu.enable(true, 'admin-menu');
    
  }

  ionViewDidEnter(){
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

  DeleteCourse(id:number){
    this.alertNotif("Are you sure you want to delete this course?", "", id)
    console.log("Delete")
  }

  async alertNotif(message:string, header:string, id:number) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'Yes', handler: ()=>
    {
      
      this.api.DeleteCourse(id).subscribe(data=>{
        // console.log(data);
        this.api.GetAllCourses().subscribe(data =>{
          // this.courses.push(data);
          this.courses = data
          // console.log(data);
          
        },(response: HttpErrorResponse) => {
        
          if (response.status === 404) {
            
             //this.alertNotif("User doesnt exist or wrong password","Opps!")
            // this.DissmissLoading()
            this.unsuccessful("Something went wrong...course was not deleted. Please try again later","Oops")
             console.log("User doesnt exist or wrong password")
          }
          if (response.status === 500){
            this.unsuccessful("Something went wrong...course was not deleted. Please try again later","Oops")
          }
          if (response.status === 400){
            this.unsuccessful("Something went wrong...course was not deleted. Please try again later","Oops")
            console.log("wrong password an error")
          }
          
        })
      })
    }},{text:"No"}]
    });

    await alert.present();
  }

  async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

   async unsuccessful(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK'}]
    });

    await alert.present();
  }

}
