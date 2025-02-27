import { Component } from '@angular/core';
import { PaymentServiceService } from '../../services/payment-service.service';
import { IPaymentModel } from '../../Models/PaymentModel';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(private myService: PaymentServiceService, private routeTo: Router, private datePipe: DatePipe) {

    this.myService.getAllPayments().subscribe({
      next: data => this.myPayments = data,
      error: err => console.log(err),
    });
  }

  myPayments: IPaymentModel[] = [];

  noApprovedReserve: boolean = false;

  onSendApprovalPayment(payment: IPaymentModel) {

    this.myService.updatePaymentReadyToApprove(payment).subscribe({
      next: pay => {
        if (!pay.isInApproval) {
          //payment.isInApproval = false;
          this.noApprovedReserve = true;
        }
      },
      error: err => console.log(err)
    });

    this.routeTo.navigate(['insurance/payment']);

  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || 'Invalid Date';
  }


  // onApprovingPayment(payment: IPaymentModel) {

  //  payment.status = "Approved";
  //  payment.statusDate = new Date();
  //   this.myService.updatePayment(payment).subscribe({
  //    next: payment => console.log(payment),
  //    error: err => console.log(err)
  //  });
    
  
  //  this.myService.updatePaymentInReserve(payment).subscribe({
  //    next: updatedReserve => console.log(updatedReserve),
  //    error: err => console.log(err)
  //  });
     

  //  this.routeTo.navigate(['/insurance/payment']);
  //}
  //onRejectingPayment(payment: IPaymentModel) {

  //  payment.status = "Rejected";
  //  payment.statusDate = new Date();
  //  this.myService.updatePayment(payment).subscribe({
  //    next: payment => console.log(payment),
  //    error: err => console.log(err)
  //  });
  //  this.routeTo.navigate(['/insurance/payment']);

  //}


}
