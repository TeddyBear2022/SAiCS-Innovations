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
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ReportComponentsModule } from './Report/report-components/report-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [AppComponent,NavbarMenuPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgbModule, FormsModule,Ng2SearchPipeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
