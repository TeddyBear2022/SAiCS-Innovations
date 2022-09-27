import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainFeedbackTypeComponent } from '../main-feedback-type/main-feedback-type.component';



@NgModule({
  declarations: [MainFeedbackTypeComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule
  ],
  exports:[MainFeedbackTypeComponent]
})
export class GeneralModule { }
