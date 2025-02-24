import { Component } from '@angular/core';
import { IReserveModel, IReserveRequestModel } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  standalone: false,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  constructor(private myService: ReserveServiceService, private routeTo:Router) {

    this.myService.getAllReserves().subscribe({
      next: data => this.myReserves = data,
      error: err => console.log(err),
    });
  }

  myReserves: IReserveModel[] = [];
  isApproveButton: boolean = false;
  isRejectButton: boolean = false


  onSendApprovalReserve(reserve: IReserveModel) {
    reserve.isInApproval = true;
    reserve.status = "Ready to Approve";
    reserve.statusDate = new Date();
    let msg: boolean = false;
    console.log(reserve);

    this.myService.updateReserve(reserve).subscribe({
      next: reserve => {
        console.log(reserve),
          msg = reserve.isInApproval
      },
      error: err => console.log(err)
    });

    if (!msg) {
      console.log("Can not approve, since, there is no approved reserve...");
    }
  }

  onApprovingReserve(reserve: IReserveModel) {

    reserve.status = "Approved";
    reserve.statusDate = new Date();
    this.myService.updateReserve(reserve).subscribe({
      next: reserve => console.log(reserve),
      error: err => console.log(err)
    });
    this.routeTo.navigate(['/insurance/reserve']);

  }
  onRejectingReserve(reserve: IReserveModel) {

    reserve.status = "Rejected";
    reserve.statusDate = new Date();
    this.myService.updateReserve(reserve).subscribe({
      next: reserve => console.log(reserve),
      error: err => console.log(err)
    });
    this.routeTo.navigate(['/insurance/reserve']);

  }

  


  

}
