import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFaqPageRoutingModule } from './view-faq-routing.module';

import { ViewFaqPage } from './view-faq.page';
import { MaintainCategoryModalComponent } from '../modals/maintain-category-modal/maintain-category-modal.component';
//import { FAQAddModalPage } from '../modals/faq-add-modal/faq-add-modal.page';

import { AddFAQModalComponent } from '../modals/add-faq-modal/add-faq-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFaqPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewFaqPage, MaintainCategoryModalComponent, AddFAQModalComponent],
  entryComponents:[MaintainCategoryModalComponent, AddFAQModalComponent]
})
export class ViewFaqPageModule {}
