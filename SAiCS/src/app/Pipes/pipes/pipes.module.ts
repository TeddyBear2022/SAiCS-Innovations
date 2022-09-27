import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from '../filter.pipe';
import { SafePipe } from '../safe.pipe';
import { PhoneNumberPipe } from '../phone-number.pipe';



@NgModule({
  declarations: [FilterPipe, SafePipe, PhoneNumberPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FilterPipe, SafePipe, PhoneNumberPipe]
})
export class PipesModule { }
