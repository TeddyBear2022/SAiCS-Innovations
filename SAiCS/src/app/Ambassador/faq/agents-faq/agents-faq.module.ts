import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentsFaqPageRoutingModule } from './agents-faq-routing.module';

import { AgentsFaqPage } from './agents-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentsFaqPageRoutingModule
  ],
  declarations: [AgentsFaqPage]
})
export class AgentsFaqPageModule {}
