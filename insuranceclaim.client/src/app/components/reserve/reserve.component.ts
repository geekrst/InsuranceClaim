import { Component } from '@angular/core';
import { IReserveModel, IReserveRequestModel } from '../../Models/ReserveModel';
import { ReserveServiceService } from '../../services/reserve-service.service';

@Component({
  selector: 'app-reserve',
  standalone: false,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  constructor(private myService: ReserveServiceService) {

    this.myService.getAllReserves().subscribe({
      next: data => this.myReserves = data,
      error: err => console.log(err),
    });
  }

  myReserves: IReserveModel[] = [];

  //myReserves: IReserveModel[] = [
  //   {
  //     id: 'scjshckjnskc',
  //     reserveDamage: BigInt(2000),
  //     reserveClaimantCost: BigInt(2000),
  //     reserveDefenceCost: BigInt(2000),
  //     paidDamage: BigInt(0),
  //     paidClaimantCost: BigInt(0),
  //     paidDefenceCost: BigInt(0),
  //     incurredDamage: BigInt(0),
  //     incurredClaimantCost: BigInt(0),
  //     incurredDefenceCost: BigInt(0),
  //     status: 'NEW',
  //     statusDate: new Date('2020-12-29T10:33:30')
  //   },
  //   {
  //     id: 'khsakcjaslcmalsmc',
  //     reserveDamage: BigInt(4000),
  //     reserveClaimantCost: BigInt(4000),
  //     reserveDefenceCost: BigInt(4000),
  //     paidDamage: BigInt(0),
  //     paidClaimantCost: BigInt(0),
  //     paidDefenceCost: BigInt(0),
  //     incurredDamage: BigInt(0),
  //     incurredClaimantCost: BigInt(0),
  //     incurredDefenceCost: BigInt(0),
  //     status: 'NEW',
  //     statusDate: new Date('2020-12-27T10:33:30')
  //   },
  //   {
  //     id: 'kbsajncalkmcla',
  //     reserveDamage: BigInt(6000),
  //     reserveClaimantCost: BigInt(6000),
  //     reserveDefenceCost: BigInt(6000),
  //     paidDamage: BigInt(0),
  //     paidClaimantCost: BigInt(0),
  //     paidDefenceCost: BigInt(0),
  //     incurredDamage: BigInt(0),
  //     incurredClaimantCost: BigInt(0),
  //     incurredDefenceCost: BigInt(0),
  //     status: 'NEW',
  //     statusDate: new Date('2020-12-24T10:33:30')
  //   }


  //];

 

  onSendApprovalReserve() {
    //updateReserveRequest.status = "Sent for Approval";

  }


  onRejectReserve() {

  }
  

}
