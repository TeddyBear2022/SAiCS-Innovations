import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAmbassadorPageRoutingModule } from './my-ambassador-routing.module';

import { MyAmbassadorPage } from './my-ambassador.page';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAmbassadorPageRoutingModule,
    PipesModule
  ],
  declarations: [MyAmbassadorPage]
})
export class MyAmbassadorPageModule {}
