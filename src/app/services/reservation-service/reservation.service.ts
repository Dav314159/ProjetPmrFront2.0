import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../../models/Reservation";
import {ReservationFull} from "../../models/ReservationFull";


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

  getAllReservationByUsername(username: string): Observable<Reservation[]>
  {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/getAllReservationsByUsername?username=${username}`);
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

  deleteReservation(data : ReservationFull) : Observable<Reservation> {
    const reserv = new Reservation(data.utilisateur.id, data.pmr.id, 0);
    console.log(reserv)
    //this.http.delete(`${this.API_URL}/${this.API_ENTITY_NAME}/deleteReservation`, body:reserv)
    /*console.log(`${this.API_URL}/${this.API_ENTITY_NAME}/deleteReservation` == 'http://localhost:8080/reservation/deleteReservation')
    if (this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/deleteReservation`, reserv)){
      console.log("URL OK");
    }*/
    return this.http.post<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/deleteReservation`, reserv);
  }
}
