import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSpecialCatComponent } from '../main-special-cat/main-special-cat.component';
import { MainSpecialTypeComponent } from '../main-special-type/main-special-type.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [MainSpecialCatComponent, MainSpecialTypeComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule
  ],
  exports: [MainSpecialCatComponent, MainSpecialTypeComponent],
})
export class SpModuleModule { }
