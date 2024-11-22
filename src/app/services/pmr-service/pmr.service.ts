import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PmrService {
  API_URL = "http://localhost:8080/api";
  API_ENTITY_NAME = "pmr"

  constructor(private readonly http: HttpClient) { }

  getAllPmr()
  {
    return this.http.get<PmrService>(`${this.API_URL}/${this.API_ENTITY_NAME}/getAllPmr`);
  }
}
