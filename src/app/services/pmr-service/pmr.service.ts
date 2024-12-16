import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pmr} from "../../models/Pmr";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PmrService {
  API_URL = "http://localhost:8080";
  API_ENTITY_NAME = "pmr";

  constructor(private readonly http: HttpClient) { }

  getAllPmr(): Observable<Pmr[]>
  {
    return this.http.get<Pmr[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/getAllPmr`);
  }

  getPmr(id: number): Observable<Pmr>
  {
    return this.http.get<Pmr>(`${this.API_URL}/${this.API_ENTITY_NAME}/getPmr?id=${id}`);
  }

  updatePmr(data: Pmr): Observable<Pmr>
  {
    return this.http.put<Pmr>(`${this.API_URL}/${this.API_ENTITY_NAME}/updatePmr`, data);
  }

  checkpmrplace(pmr_id: number): Observable<Pmr> {
    return this.http.get<Pmr>(`${this.API_URL}/${this.API_ENTITY_NAME}/getPmr?id=${pmr_id}`)
  }
}

