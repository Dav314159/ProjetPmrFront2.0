import {Component, inject, Input, QueryList, ViewChildren} from '@angular/core';
import {ChampsComponent} from "./champs/champs.component";
import { CommonModule } from '@angular/common';
import {Observable, Subscriber} from "rxjs";
import {UserService} from "../services/user-service/user.service";
import {User} from "../models/User";
import {userLogin} from "../../main";
import {AppComponent} from "../app.component";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ChampsComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  constructor(private router: Router) {}

  @ViewChildren(ChampsComponent) champsComponents!: QueryList<ChampsComponent>;

  isSignUp: boolean = false;
  userService = inject(UserService);
  error : boolean = false;
  messageErreur : string = "Message d'erreur";


  onSubmit(e : Event): void {
    e.preventDefault();

    //ne pas verifier les regex pour la connexion
    //si il y a un changement des regles il ne faut pas empecher ceux ayant un compte de se connecter
    if (this.isSignUp) {
      this.inscription(e);
    } else {
      this.connexion(e);
    }
  }

  onSwitchMode() : void {
    this.isSignUp = !this.isSignUp;
  }

  inscription(e : Event) : void{
    let regexValide : boolean = true;

    const correctValues: boolean[] = this.champsComponents.map(champ => champ.correct);
    for (let i = 0; i < this.champsComponents.length; i++) {
      regexValide = regexValide && (correctValues[i]);
    }

    if (!regexValide) {
      this.error = true;
      this.messageErreur = "Le format d'un ou plusieurs champs n'est pas respecté";
    }
    else{
      let username : HTMLInputElement = <HTMLInputElement>document.getElementById("username");
      let password : HTMLInputElement = <HTMLInputElement>document.getElementById("password");
      let mail : HTMLInputElement = <HTMLInputElement>document.getElementById("mail");
      let prenom : HTMLInputElement = <HTMLInputElement>document.getElementById("firstname");
      let nom : HTMLInputElement = <HTMLInputElement>document.getElementById("lastname");

      let dejaPris : boolean = this.userService.checkUsername(username.value);
      if (dejaPris){
        this.error = true;
        this.messageErreur = "Ce nom d'utilisateur est deja utilisé. Peut etre est ce deja le votre, dans ce cas essayez de vous connecter ?";
      }

      let user : User = new User(-1, username.value, password.value, nom.value, prenom.value, mail.value)
      let erreurInscription : boolean = this.userService.addUser(user);

      if (erreurInscription){
        this.error = true;
        this.messageErreur = "Erreur lors de l'inscription. Veuillez reessayer";
      }
      else{
        userLogin.username = username.value;
        userLogin.password = password.value;
        this.router.navigate(['/profil']);
      }
    }
  }

  connexion(e : Event): void {
    let username : HTMLInputElement = <HTMLInputElement>document.getElementById("username");
    let password : HTMLInputElement = <HTMLInputElement>document.getElementById("password");

    let correctLogin : boolean = this.userService.checkPassword(<string>username.value, <string>password.value);

    if (correctLogin){
      userLogin.username = username.value;
      userLogin.password = password.value;
      this.router.navigate(['/profil']);
    }
    else{
      this.error = true;
      this.messageErreur = "Le mot de passe ou nom d'utilisateur est incorrect";
    }
  }
}
