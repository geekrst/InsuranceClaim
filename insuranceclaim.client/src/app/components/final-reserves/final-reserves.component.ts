import { Component } from '@angular/core';
import { IReserveModel } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { IPaymentModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';

@Component({
  selector: 'app-final-reserves',
  standalone: false,
  templateUrl: './final-reserves.component.html',
  styleUrl: './final-reserves.component.css'
})
export class FinalReservesComponent {

  finalReserves: IReserveModel[] = [];
  myPayments: IPaymentModel[] = [];

  constructor(private reserveService: ReserveServiceService, private paymentService: PaymentServiceService) {

    this.reserveService.getFinalReserves().subscribe({
      next: reserves => this.finalReserves = reserves,
      error: err => console.log(err)
    });

    this.paymentService.getApprovedPayments().subscribe({
      next: payments => this.myPayments = payments,
      error: err => console.log(err)
    });
  }

}
