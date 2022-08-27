import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { FAQPageRoutingModule } from './faq-routing.module';

import { FAQPage } from './faq.page';
import { ProfilePopoverComponent } from 'src/app/profile-popover/profile-popover.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FAQPageRoutingModule
  ],
  entryComponents: [ProfilePopoverComponent],
  declarations: [FAQPage, ProfilePopoverComponent]
})
export class FAQPageModule {
 
}
