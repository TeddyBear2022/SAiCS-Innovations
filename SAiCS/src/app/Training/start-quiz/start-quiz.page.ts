import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, MenuController, PopoverController } from '@ionic/angular';
import { Console } from 'console';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';
import { ApiService } from 'src/app/Services/api.service';
import { CartService } from 'src/app/Services/cart.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.page.html',
  styleUrls: ['./start-quiz.page.scss'],
})
export class StartQuizPage implements OnInit {

  //Varibles
  questions:any =[]
  answers=[]
  score:number=0
  total:number 
  arr = [];
  username

  //proper
  questionsList =[]

  constructor(public popoverController: PopoverController, 
    private api:ApiService, 
    private menu:MenuController, 
    private alert:AlertController, 
    private route:Router,
    private cartService: CartService) { }

  ngOnInit() {
    //Menu
    this.menu.enable(true, 'ambassador-menu');

    //Quiz data
    let data = localStorage.getItem('course')
    let courseData = data.replace(',','')
    console.log(Number(courseData))
    this.api.GetQuizData(Number(courseData)).subscribe(data => {
      this.questions = data

      console.log(data)
      this.QuestionArray()
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

  QuestionArray(){
    this.questionsList =[]
    for(var x = 0; x< this.questions.length; x++){
      this.RandomArray()
      let tempList = []
    tempList[this.arr[0]-1] = { item : this.questions[x].answers, value: "point", question: this.questions[x].questions}
    tempList[ this.arr[1]-1] ={ item : this.questions[x].option1, value: "wrong1", question: this.questions[x].questions}
    tempList[this.arr[2]-1] ={ item : this.questions[x].option2, value: "wrong2", question: this.questions[x].questions}
    tempList[this.arr[3]-1] ={ item : this.questions[x].option3, value: "wrong3", question: this.questions[x].questions}
    this.questionsList.push(tempList)
    }
    
    console.log(this.questionsList)
  }

  RandomArray(){
    this.arr =[]
    while(this.arr.length < 4){
      var r = Math.floor(Math.random() * 4) + 1
      if(this.arr.indexOf(r) === -1) this.arr.push(r);
  }
    console.log(this.arr)
    console.log(this.arr[0])
  }

  // randomIntFromInterval(min, max) { // min and max included 
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }

  async presentPopover(event)
  {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event
    });
    return await popover.present();
  }

  CheckAnswers(){
    console.log(this.answers)
    this.score=0
    for(var x =0; x<= this.answers.length; x++){
      if(this.answers[x]=="point"){
        this.score+=1
      }
    }
    this.total= this.answers.length
    console.log("score:"+this.score,"Out of:"+this.total, 'Percentage:'+(this.score/this.total)*100+'%')
    if((this.score/this.total)*100 == 100){
      this.alertNotif("WOW! you got a perfect score of " +(this.score/this.total)*100+ '%', ';-)')
    }
    if((this.score/this.total)*100 <50){
      this.alertNotif("Oh no, you failed this quiz and obtained " +(this.score/this.total)*100+ '%. Please go through the course content and try again', ':-(')
    }
    if((this.score/this.total)*100 >= 50 && (this.score/this.total)*100 < 100){
      this.alertNotif("Well..you passsed, you obtained " +(this.score/this.total)*100+ '%. Please do try to do better next time', ';-)')
    }
  }

  addPoint(event, index){
    this.answers[index] = event.detail.value
    console.log(event.detail.value, index)
  }

  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler: () => {
        this.route.navigate(['access-course-intro'])
      }}]
    });

    await alert.present();
  }
  StopQuiz(){
    this.route.navigate(['access-course-intro'])
  }
}