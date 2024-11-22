import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pmr} from "../../models/Pmr";

@Injectable({
  providedIn: 'root'
})
export class PmrService {
  API_URL = "http://localhost:8080";
  API_ENTITY_NAME = "pmr";

  constructor(private readonly http: HttpClient) { }

  getAllPmr(): Pmr[]
  {
    this.http.get<Pmr[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/getAllPmr`).subscribe(
      {
        next: (response: Pmr[]) => {
          console.log(response);
          return response;
        },
        error: () => {
          console.log("oups...");
          return [];
        },
      }
    )

    return [];
  }

  getPmr(id: number): Pmr
  {
    let returnPmr: Pmr = new Pmr(-2, "", 0, 0, "");
    this.http.get<Pmr>(`${this.API_URL}/${this.API_ENTITY_NAME}/getPmr?id=${id}`).subscribe(
      {
        next: (response: Pmr) => {
          returnPmr = response;
        },
        error: (message) => {
          returnPmr = new Pmr(-1, "", 0, 0, "");
        },
      }
    )

    return returnPmr;
  }
}
