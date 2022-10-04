import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateRegistrationsPageRoutingModule } from './validate-registrations-routing.module';

import { ValidateRegistrationsPage } from './validate-registrations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateRegistrationsPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [ValidateRegistrationsPage]
})
export class ValidateRegistrationsPageModule {}
