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

  addReserve(addReserveRequest: IReserveRequestModel): Observable<IReserveModel> {
    return this.http.post<IReserveModel>(this.baseApiUrl+'/Reserve/add',addReserveRequest)
  }

  getReserve(id: string): Observable<IReserveModel> {
    return this.http.get<IReserveModel>(this.baseApiUrl+'/Reserve' + id)
  }

  updateReserve(updateReserveRequest: IReserveModel): Observable<IReserveModel> {
    return this.http.put<IReserveModel>(this.baseApiUrl + '/Reserve/Update/' + updateReserveRequest.id, updateReserveRequest);
  }
}
