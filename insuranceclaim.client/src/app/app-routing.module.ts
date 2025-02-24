import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { AppComponent } from './app.component';
import { AddReserveComponent } from './components/add-reserve/add-reserve.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { EditReserveComponent } from './components/edit-reserve/edit-reserve.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApprovedEntityComponent } from './components/approved-entity/approved-entity.component';
import { FinalReservesComponent } from './components/final-reserves/final-reserves.component';

const routes: Routes = [

  {
    path: 'insurance',
    component: DashboardComponent
  },
  {
    path: 'insurance/payment',
    component: PaymentComponent
  },
  {
    path: 'insurance/reserve', 
    component: ReserveComponent
  },
{
  path: 'insurance/reserve/add',
  component: AddReserveComponent
  },
  {
    path: 'insurance/payment/add',
    component: AddPaymentComponent
  },
  {
    path: 'insurance/reserve/edit/:id',
    component: EditReserveComponent
  },
  {
    path: 'insurance/payment/edit/:id',
    component: EditPaymentComponent
  },
  {
    path: 'insurance/approvals',
    component: ApprovedEntityComponent
  },
  {
    path: 'insurance/finalReserves',
    component: FinalReservesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
