import { Component } from '@angular/core';
import { PaymentServiceService } from '../../services/payment-service.service';
import { IPaymentModel } from '../../Models/PaymentModel';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(private myService: PaymentServiceService) {

    this.myService.getAllPayments().subscribe({
      next: data => this.myPayments = data,
      error: err => console.log(err),
    });
  }

  myPayments: IPaymentModel[] = [];



}
