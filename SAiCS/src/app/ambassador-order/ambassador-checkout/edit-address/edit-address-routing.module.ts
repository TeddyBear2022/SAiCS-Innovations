import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<<< HEAD:SAiCS/src/app/ambassador-order/ambassador-checkout/edit-address/edit-address-routing.module.ts
import { EditAddressPage } from './edit-address.page';
========
import { BankingDetailsPage } from './banking-details.page';
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<<< HEAD:SAiCS/src/app/ambassador-order/ambassador-checkout/edit-address/edit-address-routing.module.ts
    component: EditAddressPage
========
    component: BankingDetailsPage
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<<< HEAD:SAiCS/src/app/ambassador-order/ambassador-checkout/edit-address/edit-address-routing.module.ts
export class EditAddressPageRoutingModule {}
========
export class BankingDetailsPageRoutingModule {}
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/banking-details/banking-details-routing.module.ts
