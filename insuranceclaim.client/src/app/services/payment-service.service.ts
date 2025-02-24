import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaymentModel, IPaymentRequestModel } from '../Models/PaymentModel';
import { Observable } from 'rxjs/internal/Observable';
import { IReserveModel } from '../Models/ReserveModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  baseApiUrl: string = 'https://localhost:7206/api/InsuranceClaim';

  constructor(private http: HttpClient) { }


  getAllPayments(): Observable<IPaymentModel[]> {
    return this.http.get<IPaymentModel[]>(this.baseApiUrl + '/Payments');
  }

  getAllPaymentsForApproval(): Observable<IPaymentModel[]> {
    return this.http.get<IPaymentModel[]>(this.baseApiUrl + '/Payments/Approvals');
  }

  getApprovedPayments(): Observable<IPaymentModel[]> {
    return this.http.get<IPaymentModel[]>(this.baseApiUrl+'/Payments/Approved')
  }

  addPayment(addPaymentRequest: IPaymentRequestModel): Observable<IPaymentModel> {
    addPaymentRequest.id = '00000000-0000-0000-0000-000000000000';
    addPaymentRequest.status = 'NEW';
    addPaymentRequest.statusDate = new Date();
    return this.http.post<IPaymentModel>(this.baseApiUrl + '/Payment/add', addPaymentRequest)
  }

  getPayment(id: string): Observable<IPaymentModel> {
    return this.http.get<IPaymentModel>(this.baseApiUrl + '/Payment/' + id)
  }

  updatePayment(updatePaymentRequest: IPaymentModel): Observable<IPaymentModel> {
    return this.http.put<IPaymentModel>(this.baseApiUrl + '/Payment/edit/' + updatePaymentRequest.id, updatePaymentRequest);
  }

  updatePaymentReadyToApprove(updatePaymentRequest: IPaymentModel): Observable<IPaymentModel> {
    return this.http.put<IPaymentModel>(this.baseApiUrl + '/Payment/readyToApprove/' + updatePaymentRequest.id, updatePaymentRequest);
  }

  updatePaymentInReserve(paymentToBeAdded: IPaymentModel): Observable<IReserveModel> {
    return this.http.put<IReserveModel>(this.baseApiUrl + '/Payment/updateWithReserve/' + paymentToBeAdded.id , paymentToBeAdded);
  }

}
