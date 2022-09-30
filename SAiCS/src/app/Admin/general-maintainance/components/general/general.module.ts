import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainFeedbackTypeComponent } from '../main-feedback-type/main-feedback-type.component';
import { MainTitleComponent } from '../main-title/main-title.component';
import { MainCountryComponent } from '../main-country/main-country.component';
import { MainProvinceComponent } from '../main-province/main-province.component';
import { MainAccountTypeComponent } from '../main-account-type/main-account-type.component';
import { MainReferralTypeComponent } from '../main-referral-type/main-referral-type.component';

@NgModule({
  declarations: [
    MainFeedbackTypeComponent,
    MainTitleComponent,
    MainCountryComponent,
    MainProvinceComponent,
    MainAccountTypeComponent,
    MainReferralTypeComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule,
  ],
  exports: [
    MainFeedbackTypeComponent,
    MainTitleComponent,
    MainCountryComponent,
    MainProvinceComponent,
    MainAccountTypeComponent,
    MainReferralTypeComponent
  ],
})
export class GeneralModule {}
