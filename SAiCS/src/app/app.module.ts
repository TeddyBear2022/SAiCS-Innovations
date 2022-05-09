import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule],
  exports:[FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
