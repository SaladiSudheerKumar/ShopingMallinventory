import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { AddShopComponent } from './shops-list/add-shop/add-shop.component';
import {AgmCoreModule} from '@agm/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateShopComponent } from './shops-list/update-shop/update-shop.component';
import { NearyByComponent } from './shops-list/neary-by/neary-by.component';
@NgModule({
  declarations: [
    AppComponent,
    ShopsListComponent,
    AddShopComponent,
    UpdateShopComponent,
    NearyByComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOpwKb53K1YfkwSNCVrVSbwCkoskuRXWM',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
