import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientFaqPageRoutingModule } from './view-client-faq-routing.module';

import { ViewClientFaqPage } from './view-client-faq.page';
// ========
// import { NoRefferralCodePageRoutingModule } from './no-refferral-code-routing.module';

// import { NoRefferralCodePage } from './no-refferral-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
//<<<<<<<< HEAD:SAiCS/src/app/Client/client-faq/view-client-faq/view-client-faq.module.ts
    ViewClientFaqPageRoutingModule
  ],
  declarations: [ViewClientFaqPage]
})
export class ViewClientFaqPageModule {}
// ========
//     NoRefferralCodePageRoutingModule
//   ],
//   declarations: [NoRefferralCodePage]
// })
// export class NoRefferralCodePageModule {}
// >>>>>>>> 752b829c5bab5abff9337f2b7e9ca9f44b423d6a:SaicsInnovations-MobileApp/src/app/User/register/modals/no-refferral-code/no-refferral-code.module.ts
