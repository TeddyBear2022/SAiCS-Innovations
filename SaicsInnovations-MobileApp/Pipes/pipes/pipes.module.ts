import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from '../filter.pipe';
import { SafePipe } from '../safe.pipe';



@NgModule({
  declarations: [FilterPipe, SafePipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FilterPipe, SafePipe]
})
export class PipesModule { }
