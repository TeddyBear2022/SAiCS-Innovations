import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<<< HEAD:SAiCS/src/app/Client/client-faq/view-client-faq/view-client-faq-routing.module.ts
import { ViewClientFaqPage } from './view-client-faq.page';
========
import { NoRefferralCodePage } from './no-refferral-code.page';
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/modals/no-refferral-code/no-refferral-code-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<<< HEAD:SAiCS/src/app/Client/client-faq/view-client-faq/view-client-faq-routing.module.ts
    component: ViewClientFaqPage
========
    component: NoRefferralCodePage
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/modals/no-refferral-code/no-refferral-code-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<<< HEAD:SAiCS/src/app/Client/client-faq/view-client-faq/view-client-faq-routing.module.ts
export class ViewClientFaqPageRoutingModule {}
========
export class NoRefferralCodePageRoutingModule {}
>>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/modals/no-refferral-code/no-refferral-code-routing.module.ts
