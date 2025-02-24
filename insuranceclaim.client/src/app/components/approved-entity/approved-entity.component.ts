import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentServiceService } from '../../services/payment-service.service';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { IPaymentModel } from '../../Models/PaymentModel';
import { IReserveModel } from '../../Models/ReserveModel';

@Component({
  selector: 'app-approved-entity',
  standalone: false,
  templateUrl: './approved-entity.component.html',
  styleUrl: './approved-entity.component.css'
})
export class ApprovedEntityComponent {



  myReserves: IReserveModel[] = [];
  myPayments: IPaymentModel[] = [];
  constructor(private paymentService: PaymentServiceService, private reserveService: ReserveServiceService, private routeTo: Router) {

    this.paymentService.getApprovedPayments().subscribe({
      next: data => this.myPayments = data,
      error: err => console.log(err),
    });

    this.reserveService.getApprovedReserves().subscribe({
      next: data => this.myReserves = data,
      error: err => console.log(err),
    });
  }

}
