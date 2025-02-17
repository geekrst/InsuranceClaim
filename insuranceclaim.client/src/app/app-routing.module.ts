import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { AppComponent } from './app.component';
import { AddReserveComponent } from './components/add-reserve/add-reserve.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { EditReserveComponent } from './components/edit-reserve/edit-reserve.component';

const routes: Routes = [

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
    path: 'insurance/reserve/edit',
    component: EditReserveComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
