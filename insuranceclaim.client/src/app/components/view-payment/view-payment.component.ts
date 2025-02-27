import { Component } from '@angular/core';
import { PaymentServiceService } from '../../services/payment-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { IPaymentModel } from '../../Models/PaymentModel';

@Component({
  selector: 'app-view-payment',
  standalone: false,
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent {


  myPayment: IPaymentModel = {
      id: 0,
      paymentDamage: 0,
      paymentClaimantCost: 0,
      paymentDefenceCost: 0,
      isInApproval: false,
      status: '',
      statusDate:new Date(),
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
            next: payment => this.myPayment = payment,
            error: err => console.log(err)
          });
        }
      }
    })
  }

}
