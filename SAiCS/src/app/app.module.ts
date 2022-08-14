import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavbarMenuPage } from './navbar-menu/navbar-menu.page';

import { ReportComponentsModule } from './Report/report-components/report-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AppComponent,NavbarMenuPage],
  entryComponents: [],
  imports: [BrowserModule, NgxDatatableModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgbModule, FormsModule, ReportComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
