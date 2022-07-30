import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformanceStudioPageRoutingModule } from './performance-studio-routing.module';

import { PerformanceStudioPage } from './performance-studio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformanceStudioPageRoutingModule
  ],
  declarations: [PerformanceStudioPage]
})
export class PerformanceStudioPageModule {}
