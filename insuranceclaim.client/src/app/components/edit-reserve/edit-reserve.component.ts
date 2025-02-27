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
      reserveDamage: 0,
      reserveClaimantCost: 0,
      reserveDefenceCost: 0,
      id: 0
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
  preventMinusKey(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e' || event.key === 'E' || event.key === '+') {
      event.preventDefault(); // Prevent the "-" key from being entered
    }
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
