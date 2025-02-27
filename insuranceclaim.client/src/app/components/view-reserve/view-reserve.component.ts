import { Component } from '@angular/core';
import { IReserveModel } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-reserve',
  standalone: false,
  templateUrl: './view-reserve.component.html',
  styleUrl: './view-reserve.component.css'
})
export class ViewReserveComponent {

  myReserve: IReserveModel = {
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

  constructor(private myService: ReserveServiceService,
    private route: ActivatedRoute,
    private routTo: Router) {
    this.route.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.myService.getReserve(id).subscribe({
            next: reserve => this.myReserve = reserve,
            error: err => console.log(err)
          });
        }
      }
    })
  }
}
