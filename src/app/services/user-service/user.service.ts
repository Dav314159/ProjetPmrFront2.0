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

  username:string =  "";
  password:string =  "";

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
    data.currentPassword = this.password;
    data.currentUsername = this.username;
    return this.http.put<String>(`${this.API_URL}/${this.API_ENTITY_NAME}/updateUtilisateur`, data);
  }

  getUser() : Observable<User>{
    let user:User = new User(-1,this.username, this.password, "","","");
    return this.http.post<User>(`${this.API_URL}/${this.API_ENTITY_NAME}/getUtilisateurByLogin`, user);
  }

  getUserByusername(username : string) : Observable<User>{
    return this.http.get<User>(`${this.API_URL}/${this.API_ENTITY_NAME}/getUser?username=${username}`);
  }
}
