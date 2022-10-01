import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSpecialCatComponent } from '../main-special-cat/main-special-cat.component';
import { MainSpecialTypeComponent } from '../main-special-type/main-special-type.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainSpecialStatusComponent } from '../main-special-status/main-special-status.component';



@NgModule({
  declarations: [MainSpecialCatComponent, MainSpecialTypeComponent, MainSpecialStatusComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule
  ],
  exports: [MainSpecialCatComponent, MainSpecialTypeComponent, MainSpecialStatusComponent],
})
export class SpModuleModule { }
