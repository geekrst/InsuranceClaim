import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaymentModel, IPaymentRequestModel } from '../Models/PaymentModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  baseApiUrl: string = 'https://localhost:7206/api/InsuranceClaim';

  constructor(private http: HttpClient) { }


  getAllPayments(): Observable<IPaymentModel[]> {
    return this.http.get<IPaymentModel[]>(this.baseApiUrl + '/Payments');
  }

  addPayment(addPaymentRequest: IPaymentRequestModel): Observable<IPaymentModel> {
    addPaymentRequest.id = '00000000-0000-0000-0000-000000000000';
    addPaymentRequest.status = 'NEW';
    addPaymentRequest.statusDate = new Date();
    return this.http.post<IPaymentModel>(this.baseApiUrl + '/Payment/add', addPaymentRequest)
  }
}
