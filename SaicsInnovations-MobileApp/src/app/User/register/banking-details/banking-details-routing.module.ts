import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//<<<<<<<< HEAD:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts
import { BankingDetailsPage } from './banking-details.page';
// ========
// import { UpdateBankingDetailsPage } from './update-banking-details.page';
// >>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/profile/update-banking-details/update-banking-details-routing.module.ts

const routes: Routes = [
  {
    path: '',
//<<<<<<<< HEAD:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts
    component: BankingDetailsPage
// ========
//     component: UpdateBankingDetailsPage
// >>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/profile/update-banking-details/update-banking-details-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
//<<<<<<<< HEAD:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts
export class BankingDetailsPageRoutingModule {}
// ========
// export class UpdateBankingDetailsPageRoutingModule {}
// >>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/profile/update-banking-details/update-banking-details-routing.module.ts
