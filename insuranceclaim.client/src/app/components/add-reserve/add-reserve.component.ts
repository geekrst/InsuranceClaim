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
    id: '00000000-0000-0000-0000-000000000000',
    reserveDamage: BigInt(0),
    reserveClaimantCost: BigInt(0),
    reserveDefenceCost: BigInt(0),
    status: 'NEW',
    statusDate: new Date()
  }

  //  00000000-0000-0000-0000-000000000000    -- EMPTY GUID

  checkCorrectBigInt: boolean = false

  addReserve() {
    this.addReserveRequest.id = '00000000-0000-0000-0000-000000000000';
    this.addReserveRequest.status = 'New';
    this.addReserveRequest.statusDate = new Date();
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
