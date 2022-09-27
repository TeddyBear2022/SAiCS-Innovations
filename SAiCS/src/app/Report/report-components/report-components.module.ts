import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListReportComponent } from '../product-list-report/product-list-report.component';
import { AmbassadorListReportComponent } from '../ambassador-list-report/ambassador-list-report.component';
import { RecruitementListReportComponent } from '../recruitement-list-report/recruitement-list-report.component';
import { BestSellingReportComponent } from '../best-selling-report/best-selling-report.component';
import { SalesReportComponent } from '../sales-report/sales-report.component';
import { TargetReportComponent } from '../target-report/target-report.component';
import { IonicModule } from '@ionic/angular';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { PipesModule } from 'src/app/Pipes/pipes/pipes.module';
import { PhoneNumberPipe } from 'src/app/Pipes/phone-number.pipe';




@NgModule({
  declarations: [
  ProductListReportComponent,
  AmbassadorListReportComponent,
  RecruitementListReportComponent,
  BestSellingReportComponent,
  SalesReportComponent,
  TargetReportComponent,
],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    AgGridModule,
    ReactiveFormsModule
  ],
  exports:[
  ProductListReportComponent, 
  AmbassadorListReportComponent,
  RecruitementListReportComponent,
  BestSellingReportComponent,
  SalesReportComponent,
  TargetReportComponent,],
  providers:[PhoneNumberPipe]
})
export class ReportComponentsModule { }
