import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LandingPagePageRoutingModule,
    PipesModule
  ],
  declarations: [LandingPagePage],
  exports: []
})
export class LandingPagePageModule {}
