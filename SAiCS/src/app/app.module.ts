import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarMenuPage } from './navbar-menu/navbar-menu.page';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddContentModalComponent } from './Training/new-course/add-content-modal/add-content-modal.component';

//import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [AppComponent, NavbarMenuPage, AddContentModalComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
