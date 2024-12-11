import { Component } from '@angular/core';
import {userLogin} from "../../main";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  protected readonly userLogin = userLogin;

  constructor(private router: Router) {
    if (userLogin.username == "") {
      this.router.navigate(['/connexion']);
    }
  }

}
