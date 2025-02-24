import { Component } from '@angular/core';
import { IReserveModel } from '../../Models/ReserveModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveServiceService } from '../../services/reserve-service.service';

@Component({
  selector: 'app-edit-reserve',
  standalone: false,
  templateUrl: './edit-reserve.component.html',
  styleUrl: './edit-reserve.component.css'
})
export class EditReserveComponent {

  updateReserveRequest: IReserveModel = {
      id: '00000000-0000-0000-0000-000000000000',
      reserveDamage: 0n,
      reserveClaimantCost: 0n,
      reserveDefenceCost: 0n,
      status: '',
      statusDate: new Date('0000-00-00T00:00:00'),
      paidDamage: 0n,
      paidClaimantCost: 0n,
      paidDefenceCost: 0n,
      incurredDamage: 0n,
      incurredClaimantCost: 0n,
      incurredDefenceCost: 0n,
      isInApproval: false,
      isOverRidden: false
  }

  constructor(private myService: ReserveServiceService,
    private route: ActivatedRoute,
    private routTo: Router) {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.myService.getReserve(id).subscribe({
            next: reserve => this.updateReserveRequest = reserve,
            error: err => console.log(err)
          });
        }
      }
    })
  }

  updateReserve() {
    this.myService.updateReserve(this.updateReserveRequest).subscribe({
      next: reserve => {
        console.log(reserve);
        this.routTo.navigate(['/insurance/reserve']);
      },
      error: err => console.log(err)
    });

  }

}
