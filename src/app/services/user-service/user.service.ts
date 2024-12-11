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

  checkPassword(username : string, password : string): boolean
  {
    //todo hash password
    console.log(username, password);
    return true;
    //return this.http.get<User>(`${this.API_URL}/${this.API_ENTITY_NAME}/getPmr?id=${id}`);
  }

  //renvoie si l'ajout s'est bien effectue
  addUser(data : User) : boolean{
    return false;
  }

  checkUsername(username : string) : boolean{
    return true;
  }

}
