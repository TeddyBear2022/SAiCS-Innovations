import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientOrderhistoryPageRoutingModule } from './client-orderhistory-routing.module';

import { ClientOrderhistoryPage } from './client-orderhistory.page';
import { ClientOrderDetailsComponent } from '../client-order-details/client-order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientOrderhistoryPageRoutingModule,
    NgxPaginationModule
    
  ],
  declarations: [ClientOrderhistoryPage, ClientOrderDetailsComponent],
  entryComponents: [ClientOrderDetailsComponent]
})
export class ClientOrderhistoryPageModule {}
