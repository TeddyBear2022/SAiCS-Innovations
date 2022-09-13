import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LandingPagePageRoutingModule,
    IonicModule,
    NgbModule,
    PipesModule
  ],
  declarations: [LandingPagePage]
})
export class LandingPagePageModule {}
