import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(
    private api:ApiService,
    private router:Router){}

    //Variables
  faqCategories: any
  username;

  

  ngOnInit() {
    this.api.GetClientFAQS().subscribe(data => {
      this.faqCategories = data
      console.log(this.faqCategories)
    })
    
  }


  showFAQ(catId){
    console.log(catId);
    localStorage.setItem('faq', catId)
    this.router.navigate(['./faq-details'])
  }



}
