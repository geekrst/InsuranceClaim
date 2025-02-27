import { Component } from '@angular/core';
import { IPaymentModel, IPaymentRequestModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-payment',
  standalone: false,
  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css'
})
export class EditPaymentComponent {

 

  updatePaymentRequest: IPaymentRequestModel = {
      paymentDamage: 0,
      paymentClaimantCost: 0,
      paymentDefenceCost: 0,
      paymentType: '',
      id: 0
  }

  constructor(private myService: PaymentServiceService,
    private route: ActivatedRoute,
    private routTo: Router) {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.myService.getPayment(id).subscribe({
            next: payment => this.updatePaymentRequest = payment,
            error: err => console.log(err)
          });
        }
      }
    })
  }

  updatePayment() {
    this.myService.updatePayment(this.updatePaymentRequest).subscribe({
      next: payment => {
        console.log(payment);
        this.routTo.navigate(['/insurance/payment']);
      },
      error: err => console.log(err)
    });

  }


}
