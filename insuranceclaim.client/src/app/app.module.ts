import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddReserveComponent } from './components/add-reserve/add-reserve.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { EditReserveComponent } from './components/edit-reserve/edit-reserve.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';

import { ApprovalComponent } from './components/approval/approval.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApprovedEntityComponent } from './components/approved-entity/approved-entity.component';
import { FinalReservesComponent } from './components/final-reserves/final-reserves.component';
import { ViewReserveComponent } from './components/view-reserve/view-reserve.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
//import {  }

@NgModule({
  declarations: [
    AppComponent,
    ReserveComponent,
    PaymentComponent,
    AddReserveComponent,
    AddPaymentComponent,
    EditReserveComponent,
    EditPaymentComponent,
    ApprovalComponent,
    DashboardComponent,
    ApprovedEntityComponent,
    FinalReservesComponent,
    ViewReserveComponent,
    ViewPaymentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CommonModule, FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
