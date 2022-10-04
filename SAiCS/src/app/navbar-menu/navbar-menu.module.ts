import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavbarMenuPageRoutingModule } from './navbar-menu-routing.module';

import { NavbarMenuPage } from './navbar-menu.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarMenuPageRoutingModule,
    NgModule
    
    
  ],
  declarations: []
})
export class NavbarMenuPageModule {}
