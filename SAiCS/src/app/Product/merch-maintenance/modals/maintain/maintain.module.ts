import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchStatusComponent } from '../merch-status/merch-status.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MerchCatComponent } from '../merch-cat/merch-cat.component';
import { MerchTypeComponent } from '../merch-type/merch-type.component';
import { VatComponent } from '../vat/vat.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';
import { OrderStatusComponent } from '../order-status/order-status.component';

@NgModule({
  declarations: [
    MerchStatusComponent,
    MerchCatComponent,
    MerchTypeComponent,
    VatComponent,
    DeliveryTypeComponent,
    OrderStatusComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxPaginationModule,
  ],
  exports: [
    MerchStatusComponent,
    MerchCatComponent,
    MerchTypeComponent,
    VatComponent,
    DeliveryTypeComponent,
    OrderStatusComponent
  ],
})
export class MaintainModule {}
