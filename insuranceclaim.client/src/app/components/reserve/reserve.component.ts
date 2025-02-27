import { Component } from '@angular/core';
import { IReserveModel, IReserveModel1 } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserve',
  standalone: false,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  constructor(private myService: ReserveServiceService, private routeTo: Router, private datePipe: DatePipe) {

    this.myService.getAllReserves().subscribe({
      next: (data) => {
        this.myReserves = data;

      },
      error: err => console.log(err),
    });
  }

  myReserves: IReserveModel[] = [];
  arr: IReserveModel1[] = [];

  isApproveButton: boolean = false;
  isRejectButton: boolean = false

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || 'Invalid Date';
  }


  onSendApprovalReserve(reserve: IReserveModel) {


    this.myService.updatereserveReadyToApprove(reserve).subscribe({
      next: reserve => console.log(reserve),
      error: err => console.log(err)
    });

    this.routeTo.navigate(['/insurance/reserve']);

  }

  //onApprovingReserve(reserve: IReserveModel) {

  //  reserve.status = "Approved";
  //  reserve.statusDate = new Date();
  //  this.myService.updateReserve(reserve).subscribe({
  //    next: reserve => console.log(reserve),
  //    error: err => console.log(err)
  //  });
  //  this.routeTo.navigate(['/insurance/reserve']);

  //}
  //onRejectingReserve(reserve: IReserveModel) {

  //  reserve.status = "Rejected";
  //  reserve.statusDate = new Date();
  //  this.myService.updateReserve(reserve).subscribe({
  //    next: reserve => console.log(reserve),
  //    error: err => console.log(err)
  //  });
  //  this.routeTo.navigate(['/insurance/reserve']);

  //}

  


  

}
