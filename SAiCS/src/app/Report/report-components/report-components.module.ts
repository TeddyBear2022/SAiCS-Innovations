import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListReportComponent } from '../product-list-report/product-list-report.component';
import { AmbassadorListReportComponent } from '../ambassador-list-report/ambassador-list-report.component';
import { RecruitementListReportComponent } from '../recruitement-list-report/recruitement-list-report.component';
import { BestSellingReportComponent } from '../best-selling-report/best-selling-report.component';
import { SalesReportComponent } from '../sales-report/sales-report.component';
import { TargetReportComponent } from '../target-report/target-report.component';
import { LeaderboardReportComponent } from '../leaderboard-report/leaderboard-report.component';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
  ProductListReportComponent,
  AmbassadorListReportComponent,
  RecruitementListReportComponent,
  BestSellingReportComponent,
  SalesReportComponent,
  TargetReportComponent,
  LeaderboardReportComponent
],
  imports: [
    CommonModule,
    NgxDatatableModule,
    IonicModule.forRoot()
  ],
  exports:[
  ProductListReportComponent, 
  AmbassadorListReportComponent,
  RecruitementListReportComponent,
  BestSellingReportComponent,
  SalesReportComponent,
  TargetReportComponent,
  LeaderboardReportComponent]
})
export class ReportComponentsModule { }