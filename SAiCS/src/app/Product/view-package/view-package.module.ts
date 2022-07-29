import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPackagePageRoutingModule } from './view-package-routing.module';

import { ViewPackagePage } from './view-package.page';
import { UpdatePackageModalComponent } from '../update-package-modal/update-package-modal.component';
import { CreatePackageModalComponent } from '../create-package-modal/create-package-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewPackagePageRoutingModule
  ],
  declarations: [ViewPackagePage, CreatePackageModalComponent,UpdatePackageModalComponent],
  entryComponents: [CreatePackageModalComponent, UpdatePackageModalComponent]
})
export class ViewPackagePageModule {}
