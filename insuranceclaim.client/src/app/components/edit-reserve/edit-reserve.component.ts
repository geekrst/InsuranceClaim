import { Component } from '@angular/core';
import { IReserveRequestModel } from '../../Models/ReserveModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveServiceService } from '../../services/reserve-service.service';

@Component({
  selector: 'app-edit-reserve',
  standalone: false,
  templateUrl: './edit-reserve.component.html',
  styleUrl: './edit-reserve.component.css'
})
export class EditReserveComponent {

  updateReserveRequest: IReserveRequestModel = {
    id: '00000000-0000-0000-0000-000000000000',
    reserveDamage: BigInt(0),
    reserveClaimantCost: BigInt(0),
    reserveDefenceCost: BigInt(0),
    status: '',
    statusDate: new Date('0000-00-00T00:00:00')
  }

  constructor(private myService: ReserveServiceService,
    private route: ActivatedRoute,
    private routTo: Router) {
    this.route.paramMap.subscribe({
      next: param => {
        const id = param.get('id');
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
      }
      error: err => console.log(err)
    });

  }

}
