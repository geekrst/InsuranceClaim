export interface IReserveRequestModel {
  id: number,
  reserveDamage: number,
  reserveClaimantCost: number,
  reserveDefenceCost: number,

}


export interface IReserveModel {
  id: number,
  reserveDamage: number,
  reserveClaimantCost: number,
  reserveDefenceCost: number,
  paidDamage: number,
  paidClaimantCost: number,
  paidDefenceCost: number,
  incurredDamage: number,
  incurredClaimantCost: number,
  incurredDefenceCost: number,
  isInApproval: boolean,
  isOverRidden:boolean,
  status: string,
  statusDate: Date,
}

export interface IReserveModel1 extends IReserveModel{
  statusDate1: Date,

}
export interface DataObject {
  date: Date;
  [key: string]: any;  // Allow other properties in the object
}


