import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddReserveComponent } from './components/add-reserve/add-reserve.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { EditReserveComponent } from './components/edit-reserve/edit-reserve.component';
//import {  }

@NgModule({
  declarations: [
    AppComponent,
    ReserveComponent,
    PaymentComponent,
    AddReserveComponent,
    AddPaymentComponent,
    EditReserveComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CommonModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
