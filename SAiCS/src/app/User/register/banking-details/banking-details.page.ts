import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import{BankAccount} from 'src/app/Models/BankAccount'
import { Router } from '@angular/router';

@Component({
  selector: 'app-banking-details',
  templateUrl: './banking-details.page.html',
  styleUrls: ['./banking-details.page.scss'],
})
export class BankingDetailsPage implements OnInit {

  BankingDetails:FormGroup
  BankingInputs:any = []

  constructor(private api:ApiService, 
    private route:Router) { }

  ngOnInit() {
    
    //form
    this.BankingDetails = new FormGroup({
      //BankAccountId: new FormControl('', Validators.required),
      AccountNumber: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]) ),
      BankId: new FormControl('', Validators.required),
      AccountTypeId: new FormControl('', Validators.required),
      AccountHolder: new FormControl('', Validators.required)
      })

    //inputs from api
    this.api.BankInputInfo().subscribe(data => {
      this.BankingInputs = data
      console.log(data)
    })

  }

  Next(){
    // console.log(this.BankingDetails.value)
    if(this.BankingDetails.invalid){
      console.log("Errors")
    }
    if(this.BankingDetails.valid){
      let bAccount:BankAccount =this.BankingDetails.value
      localStorage.setItem('bankAccount',JSON.stringify(bAccount) )
      console.log(bAccount)
      this.route.navigate(['next'])
    }
  }
}
