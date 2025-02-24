export interface IPaymentRequestModel {
  id: string,
  paymentDamage: bigint,
  paymentClaimantCost: bigint,
  paymentDefenceCost: bigint,
  status: string,
  statusDate: Date,
  paymentType: string
}


export interface IPaymentModel {
  id: string,
  paymentDamage: bigint,
  paymentClaimantCost: bigint,
  paymentDefenceCost: bigint,
  isInApproval: boolean,
  status: string,
  statusDate: Date,
  paymentType: string

}
