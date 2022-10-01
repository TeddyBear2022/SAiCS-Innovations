import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-access-course',
  templateUrl: './access-course.page.html',
  styleUrls: ['./access-course.page.scss'],
})
export class AccessCoursePage implements OnInit {

  //Variables
  courses = []
  username

  constructor(private menu:MenuController, 
    private api:ApiService, 
    private popoverController:PopoverController, 
    private route:Router,private cartService: CartService) { }

  ngOnInit() {
    this.menu.enable(true, 'ambassador-menu');
    // this.menu.open('client-menu')
    this.api.AmbassadorAccessCourse().subscribe(data =>{
      this.courses = data
      console.log("Access course");
      console.log(data)
    })
    
    this.username = localStorage.getItem('UserName')
  }

  ionViewWillEnter(){
    this.api.AmbassadorAccessCourse().subscribe(data =>{
      // this.courses = data
      // console.log("Access course");
      console.log(data)
    })

    
    this.username = localStorage.getItem('UserName')
  }

  
  get TotalItems() {
    // this.cartService.getItems();
    this.cartService.loadCart();
    var cartItemCount = [];
    cartItemCount = this.cartService.getItems();
    return cartItemCount.length;
  }
  
  async presentPopover(event)
   {
     const popover = await this.popoverController.create({
       component: ProfilePopoverComponent,
       event
     });
     return await popover.present();
   }

   AccessCourse(id:number){
    this.api.setAccessCourseId(id)
    console.log(id)
    localStorage.setItem('course', JSON.stringify(id))
    console.log("Access course")
    this.route.navigate(['access-course-intro'])

   }

}
