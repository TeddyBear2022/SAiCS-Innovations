import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSpecialPageRoutingModule } from './view-special-routing.module';

import { ViewSpecialPage } from './view-special.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewSpecialPageRoutingModule,
    PipesModule,
    NgxPaginationModule
  ],
  declarations: [ViewSpecialPage],
})
export class ViewSpecialPageModule {}
