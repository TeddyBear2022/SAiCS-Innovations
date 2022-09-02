import { BankingDetailsPageModule } from "src/app/User/register/banking-details/banking-details.module";
import { BankAccount } from "../BankAccount";
import { accessInfoVM } from "./accessinfoVM";
import { registerationinfoVM } from "./registerationinfoVM";

export class registerVM{
    AccessInfo:accessInfoVM
    RegisterInfo:registerationinfoVM
    BankAccount:BankAccount
    
    constructor(access:accessInfoVM, register:registerationinfoVM,bank?:BankAccount) {
      this.AccessInfo = access
      this.RegisterInfo = register
      this.BankAccount = bank
    }
}
