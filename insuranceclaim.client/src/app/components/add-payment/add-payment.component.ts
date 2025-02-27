import { Component } from '@angular/core';
import { IPaymentRequestModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';
import { Router } from '@angular/router';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { IReserveModel } from '../../Models/ReserveModel';

@Component({
  selector: 'app-add-payment',
  standalone: false,
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent {

  constructor(private payService: PaymentServiceService, private resService: ReserveServiceService, private routTo: Router) {

    this.resService.getLatestReserve().subscribe({
      next: reserve => this.latestReserve= reserve,
      error: err => console.log(err)
    });
  }

  addPaymentRequest: IPaymentRequestModel = {
      paymentDamage: 0,
      paymentClaimantCost: 0,
      paymentDefenceCost: 0,
      paymentType: '',
      id: 0
  }
 
  latestReserve: IReserveModel = {
    id: 0,
    reserveDamage: 0,
    reserveClaimantCost: 0,
    reserveDefenceCost: 0,
    paidDamage: 0,
    paidClaimantCost: 0,
    paidDefenceCost: 0,
    incurredDamage: 0,
    incurredClaimantCost: 0,
    incurredDefenceCost: 0,
    isInApproval: false,
    isOverRidden: false,
    status: '',
    statusDate: new Date()
  }
  noReserve: boolean = false;
  
  validPaymentAmount: boolean = true;


  preventMinusKey(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e' || event.key === 'E'  || event.key === '+') {
      event.preventDefault(); // Prevent the "-" key from being entered
    }
  }

  addPayment() {

    if (this.latestReserve.status != "Approved") {
      this.noReserve = true;
    }

    if (this.addPaymentRequest.paymentType == '') {
      this.validPaymentAmount = false;
      return
    } else {
      if (this.addPaymentRequest.paymentDamage ==0 && this.addPaymentRequest.paymentClaimantCost ==0 && this.addPaymentRequest.paymentDefenceCost ==0) {
        this.validPaymentAmount = false;
        return
      } else if (this.addPaymentRequest.paymentType == 'Paid' && this.addPaymentRequest.paymentDamage <= this.latestReserve.reserveDamage && this.addPaymentRequest.paymentClaimantCost <= this.latestReserve.reserveClaimantCost && this.addPaymentRequest.paymentDefenceCost <= this.latestReserve.reserveDefenceCost) {
        this.validPaymentAmount = true;
      } else if (this.addPaymentRequest.paymentType == 'Recovery' && this.addPaymentRequest.paymentDamage <= this.latestReserve.paidDamage && this.addPaymentRequest.paymentClaimantCost <= this.latestReserve.paidClaimantCost && this.addPaymentRequest.paymentDefenceCost <= this.latestReserve.paidDefenceCost) {
        this.validPaymentAmount = true;
      } else {
        this.validPaymentAmount = false;
        return
      }
    }
  


    

    this.payService.addPayment(this.addPaymentRequest).subscribe(
      {
        next: (payment) => {
          console.log(payment);
          this.addPaymentRequest = payment;
          this.routTo.navigate(['insurance/payment']);

        },
        error: (response) => {
          console.log(response);
        }
      }
    )

  }



}
