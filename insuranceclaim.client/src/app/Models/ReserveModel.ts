export interface IReserveRequestModel {
  id: string,
  reserveDamage: bigint,
  reserveClaimantCost: bigint,
  reserveDefenceCost: bigint,
  status: string,
  statusDate: Date,
}


export interface IReserveModel {
  id: string,
  reserveDamage: bigint,
  reserveClaimantCost: bigint,
  reserveDefenceCost: bigint,
  paidDamage: bigint,
  paidClaimantCost: bigint,
  paidDefenceCost: bigint,
  incurredDamage: bigint,
  incurredClaimantCost: bigint,
  incurredDefenceCost: bigint,
  status: string,
  statusDate: Date,
}



