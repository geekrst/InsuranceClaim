import { Component } from '@angular/core';
import { IPaymentRequestModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  standalone: false,
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css'
})
export class AddPaymentComponent {

  constructor(private myService: PaymentServiceService, private routTo: Router) { }

  addPaymentRequest: IPaymentRequestModel = {
    id: '00000000-0000-0000-0000-000000000000',
    paymentDamage: BigInt(0),
    paymentClaimantCost: BigInt(0),
    paymentDefenceCost: BigInt(0),
    status: 'NEW',
    statusDate: new Date('0000-00-00T00:00:00')
  }
 
  
  noReserve: boolean = false;
  addPayment() {
    this.myService.addPayment(this.addPaymentRequest).subscribe(
      {
        next: (payment) => {
          console.log(payment);
          this.addPaymentRequest = payment;
          this.routTo.navigate(['insurance/payment']);

        },
        error: (response) => {
          console.log(response);
          this.noReserve = true;
        }
      }
    )

  }



}
