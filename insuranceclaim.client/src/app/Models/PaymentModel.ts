export interface IPaymentRequestModel {
  id: string,
  paymentDamage: bigint,
  paymentClaimantCost: bigint,
  paymentDefenceCost: bigint,
  status: string,
  statusDate: Date,
}


export interface IPaymentModel {
  id: string,
  paymentDamage: bigint,
  paymentClaimantCost: bigint,
  paymentDefenceCost: bigint,
  status: string,
  statusDate: Date,
}
