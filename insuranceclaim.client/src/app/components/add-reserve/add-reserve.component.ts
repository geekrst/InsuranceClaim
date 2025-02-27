import { Component } from '@angular/core';
import { IReserveRequestModel } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reserve',
  standalone: false,
  templateUrl: './add-reserve.component.html',
  styleUrl: './add-reserve.component.css'
})
export class AddReserveComponent {

  constructor(private myService: ReserveServiceService, private routTo: Router) { }

  addReserveRequest: IReserveRequestModel = {
      reserveDamage: 0,
      reserveClaimantCost: 0,
      reserveDefenceCost: 0,
      id: 0
  }
  preventMinusKey(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e' || event.key === 'E' || event.key === '+') {
      event.preventDefault(); // Prevent the "-" key from being entered
    }
  }
  validReserve: boolean = true;

  addReserve() {

    this.validReserve = (this.addReserveRequest.reserveDamage > 0 || this.addReserveRequest.reserveClaimantCost > 0 || this.addReserveRequest.reserveDefenceCost > 0);

    if (this.validReserve) {

      this.myService.addReserve(this.addReserveRequest).subscribe(
        {
          next: (reserve) => {
            console.log(reserve);
            this.addReserveRequest = reserve;
            this.routTo.navigate(['insurance/reserve']);
          },
          error: (response) => {
            console.log(response);
          }
        }
      )
    }
   }



}
