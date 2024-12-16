import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../../models/Reservation";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  API_URL = "http://localhost:8080";
  API_ENTITY_NAME = "reservation";

  constructor(private readonly http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]>
  {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/getAllReservations`);
  }

  getReservation(pmr_id: number): Observable<Reservation>
  {
    return this.http.get<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/getReservation?pmr_id=${pmr_id}`);
  }

  updateReservation(data: Reservation): Observable<Reservation>
  {
    return this.http.put<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/updateReservation`, data);
  }

  addReservation(data : Reservation) : Observable<Reservation>{
    return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/addReservation`, data);
  }
}
