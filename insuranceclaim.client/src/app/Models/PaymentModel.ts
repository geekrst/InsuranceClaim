export interface IPaymentRequestModel {
  id: number,
  paymentDamage: number,
  paymentClaimantCost: number,
  paymentDefenceCost: number,
  paymentType: string
}


export interface IPaymentModel {
  id: number,
  paymentDamage: number,
  paymentClaimantCost: number,
  paymentDefenceCost: number,
  isInApproval: boolean,
  status: string,
  statusDate: Date,
  paymentType: string

}
