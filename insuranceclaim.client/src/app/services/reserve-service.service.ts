import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReserveModel, IReserveRequestModel } from '../Models/ReserveModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveServiceService {

  baseApiUrl: string = 'https://localhost:7206/api/InsuranceClaim';

  constructor(private http: HttpClient) { }

  getAllReserves(): Observable<IReserveModel[]> {
    return this.http.get<IReserveModel[]>(this.baseApiUrl + '/Reserves');
  }

  getAllReservesForApproval(): Observable<IReserveModel[]> {
    return this.http.get<IReserveModel[]>(this.baseApiUrl + '/Reserves/Approvals');
  }

  getApprovedReserves(): Observable<IReserveModel[]> {
    return this.http.get<IReserveModel[]>(this.baseApiUrl + '/Reserves/Approved')
  }

  getFinalReserves(): Observable<IReserveModel[]> {
    return this.http.get<IReserveModel[]>(this.baseApiUrl + '/CalculatedReservesWithPayments');
  }

  addReserve(addReserveRequest: IReserveRequestModel): Observable<IReserveModel> {
    return this.http.post<IReserveModel>(this.baseApiUrl+'/Reserve/add',addReserveRequest)
  }

  getReserve(id: string): Observable<IReserveModel> {
    return this.http.get<IReserveModel>(this.baseApiUrl+'/Reserve/' + id)
  }

  getLatestReserve(): Observable<IReserveModel> {
    return this.http.get<IReserveModel>(this.baseApiUrl + '/LatestReserve/')
  }

  updateReserve(updateReserveRequest: IReserveRequestModel): Observable<IReserveModel> {
    return this.http.put<IReserveModel>(this.baseApiUrl + '/Reserve/edit/' + updateReserveRequest.id, updateReserveRequest);
  }
  updatereserveReadyToApprove(updateReserveRequest: IReserveModel): Observable<IReserveModel> {
    return this.http.put<IReserveModel>(this.baseApiUrl + '/reserve/readyToApprove/' + updateReserveRequest.id, updateReserveRequest);
  }
}
