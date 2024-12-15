import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {ChampsComponent} from "../connexion/champs/champs.component";
import {NgIf} from "@angular/common";
import {ConnexionComponent} from "../connexion/connexion.component";
import {UserService} from "../services/user-service/user.service";


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    ChampsComponent,
    NgIf,
    ConnexionComponent
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  userService = inject(UserService);


  constructor(private router: Router) {
    if (this.userService.username == "") {
      this.router.navigate(['/connexion']);
    }
    this.remplirChamps();
  }

  remplirChamps(){
    this.userService.getUser().subscribe({
      next: user => {
        console.log("user recu");
        let username: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
        let password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
        let mail: HTMLInputElement = <HTMLInputElement>document.getElementById("mail");
        let prenom: HTMLInputElement = <HTMLInputElement>document.getElementById("firstname");
        let nom: HTMLInputElement = <HTMLInputElement>document.getElementById("lastname");

        username.value = user.username;
        password.value = user.password;
        mail.value = user.mail;
        prenom.value = user.prenom;
        nom.value = user.nom;
      },
      error: error =>{
        console.log("user non recu");
      }

    });
  }



}
