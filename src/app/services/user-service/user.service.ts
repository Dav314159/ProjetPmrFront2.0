import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {userLogin} from "../../../main";

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

  updateUser(data : User) : Observable<String>{
    data.currentPassword = userLogin.password;
    data.currentUsername = userLogin.username;
    return this.http.put<String>(`${this.API_URL}/${this.API_ENTITY_NAME}/updateUtilisateur`, data);
  }

  getUser() : Observable<User>{
    return this.http.post<User>(`${this.API_URL}/${this.API_ENTITY_NAME}/getUtilisateurByLogin`, userLogin);
  }
}
