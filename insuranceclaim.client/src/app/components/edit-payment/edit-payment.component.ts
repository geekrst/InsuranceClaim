import { Component } from '@angular/core';
import { IPaymentModel } from '../../Models/PaymentModel';
import { PaymentServiceService } from '../../services/payment-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-payment',
  standalone: false,
  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css'
})
export class EditPaymentComponent {

 

  updatePaymentRequest: IPaymentModel = {
      id: '00000000-0000-0000-0000-000000000000',
      paymentDamage: 0n,
      paymentClaimantCost: 0n,
      paymentDefenceCost: 0n,
      status: '',
      statusDate: new Date('0000-00-00T00:00:00'),
    isInApproval: false,
      paymentType: ''
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
