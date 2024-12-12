import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = "http://localhost:8080";
  API_ENTITY_NAME = "utilisateur";

  constructor(private readonly http: HttpClient) { }

  checkPassword(username : string, password : string): Observable<boolean>
  {
    return this.http.get<boolean>(`${this.API_URL}/${this.API_ENTITY_NAME}/checkLogin?username=${username}&password=${password}`);
  }

  addUser(data : User) : Observable<User>{
    return this.http.post<User>(`${this.API_URL}/${this.API_ENTITY_NAME}/addUtilisateur`, data);
  }

  checkUsername(username : string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.API_URL}/${this.API_ENTITY_NAME}/isUsernameAvailable?username=${username}`);
  }

}
