import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-update-banking-details',
  templateUrl: './update-banking-details.page.html',
  styleUrls: ['./update-banking-details.page.scss'],
})
export class UpdateBankingDetailsPage implements OnInit {

  //Variables
  updateBankAccount:FormGroup
  bankInfo
  BankingInputs:any = []

  constructor(private modal:ModalController, 
    private alert:AlertController, 
    private api:ApiService) { }

  ngOnInit() {
    this.updateBankAccount = new FormGroup({
      bankAccountId: new FormControl(this.bankInfo.bankAccountId),
      AccountNumber: new FormControl(this.bankInfo.accountNumber,Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]) ),
      BankId: new FormControl(this.bankInfo.bank.bankId, Validators.required),
      AccountTypeId: new FormControl(this.bankInfo.accountType.accountTypeId, Validators.required),
      AccountHolder: new FormControl(this.bankInfo.accountHolder, Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z]*)(\s)([a-zA-Z]*)$/)]))
      
    })
    console.log(this.bankInfo);
    this.BankInputs()
    
  }
  BankInputs(){
    //inputs from api
    this.api.BankInputInfo().subscribe(data => {
      this.BankingInputs = data
      console.log(data)
    })

  }
  Dissmiss(){
    this.modal.dismiss({status : "update", bankUpdate: this.updateBankAccount.value})
  }

  Close(){
    this.modal.dismiss({status : "close" , bankUpdate: this.bankInfo})
  }

  Update(){
    if(this.updateBankAccount.valid){
      console.log(this.updateBankAccount.value)
      this.api.UpdateBankDetails(this.updateBankAccount.value).subscribe(data => {
        console.log(data)
        if(data == true){
          this.alertNotif("You bank account has been successfully updated","Success")
        }
      },(response: HttpErrorResponse) => {
       
        if (response.status === 500){
          this.alertNotif("Something went wrong...your bank account wasn't updated. Please try again later","Unsuccessful!")
         console.log("Encountered an error")
        }
        if (response.status === 400){
          this.alertNotif("Something went wrong...your bank account wasn't updated. Please try again later","Unsuccessful")
          console.log("wrong password an error")
        }
        
      })
      console.log(this.updateBankAccount.value);
      
    }
    if(this.updateBankAccount.invalid){
      console.log("Invalid form");
      
    }
  }

  //Notfication
  async alertNotif(message:string, header:string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [{text: 'OK', handler:()=>{
        this.Dissmiss()
      }}]
    });

    await alert.present();
  }

}
