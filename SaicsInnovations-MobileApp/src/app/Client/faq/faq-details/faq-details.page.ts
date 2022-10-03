import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.page.html',
  styleUrls: ['./faq-details.page.scss'],
})
export class FaqDetailsPage implements OnInit {
  DeliveryFAQs
  showText: any = []
  username;

  constructor(private api:ApiService,){}

  ngOnInit() {;
    this.username = localStorage.getItem('UserName');
    this.api.ClientSpecificFaq().subscribe(data => {
      this.DeliveryFAQs =data
      console.log(data);
      
    })
  }

  hoverStateIn(index){
    this.showText[index] = true;
  }

  hoverStateOut(index){
    this.showText[index] = false;
  }

  Back() {
    history.back();
  }


}
