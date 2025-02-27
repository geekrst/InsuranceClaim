import { Component } from '@angular/core';
import { IReserveModel } from '../../Models/ReserveModel';
import { IPaymentModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approval',
  standalone: false,
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent {

  myReserves : IReserveModel[] = [];
  myPayments: IPaymentModel[] = [];

  constructor(private paymentService: PaymentServiceService, private reserveService: ReserveServiceService, private routeTo: Router, private datePipe: DatePipe) {

    this.paymentService.getAllPaymentsForApproval().subscribe({
      next: data => this.myPayments = data,
      error: err => console.log(err),
    });

    this.reserveService.getAllReservesForApproval().subscribe({
      next: data => this.myReserves = data,
      error: err => console.log(err),
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || 'Invalid Date';
  }

  onApprovingReserve(reserve: IReserveModel) {

    reserve.isInApproval = false;
    reserve.status = "Approved";
    reserve.statusDate = new Date();
    this.reserveService.updateReserve(reserve).subscribe({
      next: reserve => console.log(reserve),
      error: err => console.log(err)
    });
    this.routeTo.navigate(['/insurance/approvals']);

  }
  onRejectingReserve(reserve: IReserveModel) {

    reserve.isInApproval = false;
    reserve.status = "Rejected";
    reserve.statusDate = new Date();
    this.reserveService.updateReserve(reserve).subscribe({
      next: reserve => console.log(reserve),
      error: err => console.log(err)
    });
    this.routeTo.navigate(['/insurance/approvals']);

  }

  //onApprovingPayment(payment: IPaymentModel) {

  //  payment.isInApproval = false;
  //  payment.status = "Approved";
  //  payment.statusDate = new Date();
  //  this.paymentService.updatePayment(payment).subscribe({
  //    next: payment => console.log(payment),
  //    error: err => console.log(err)
  //  });
  //  this.routeTo.navigate(['/insurance/approvals']);
  //}


  onApprovingPayment(payment: IPaymentModel) {

    payment.status = "Approved";
    payment.statusDate = new Date();
    this.paymentService.updatePayment(payment).subscribe({
      next: payment => console.log(payment),
      error: err => console.log(err)
    });
    this.paymentService.updatePaymentInReserve(payment).subscribe({
      next: updatedReserve => console.log(updatedReserve),
      error: err => console.log(err)
    });


    this.routeTo.navigate(['/insurance/approvals']);
  }


  onRejectingPayment(payment: IPaymentModel) {

    payment.isInApproval = false;
    payment.status = "Rejected";
    payment.statusDate = new Date();
    this.paymentService.updatePayment(payment).subscribe({
      next: payment => console.log(payment),
      error: err => console.log(err)
    });
    this.routeTo.navigate(['/insurance/approvals']);

  }
}
