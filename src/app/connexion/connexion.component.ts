import {Component, inject, QueryList, ViewChildren} from '@angular/core';
import {ChampsComponent} from "./champs/champs.component";
import { CommonModule } from '@angular/common';
import {UserService} from "../services/user-service/user.service";
import {User} from "../models/User";
import {userLogin} from "../../main";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";

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

  verifRempli() : boolean {
    let rempli:boolean = true;

    let listeInput : HTMLCollection = <HTMLCollection>document.getElementsByTagName("input");
    for (let i = 0; i < listeInput.length; i++) {
      let input: HTMLInputElement = <HTMLInputElement><unknown>listeInput[i];
      if (input.value == ""){
        rempli = false;
      }
    }

    return rempli;
  }

  onSubmit(e : Event): void {
    e.preventDefault();

    if (!this.verifRempli()){
      this.error = true;
      this.messageErreur = "Tous les champs ne sont pas rempli";
      return;
    }

    if (this.isSignUp) {
      this.inscription();
    } else {
      this.connexion();
    }
  }

  onSwitchMode() : void {
    this.isSignUp = !this.isSignUp;
  }

  inscription() : void{
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

      let user : User = new User(-1, username.value, password.value, nom.value, prenom.value, mail.value)

      this.checkUsername(user);
    }
  }

  checkUsername(user : User) {
    this.userService.checkUsername(user.username).subscribe({
      next: disponible => {
        if (disponible) {
          this.addUser(user);
        } else {
          this.error = true;
          this.messageErreur = "Ce nom d'utilisateur est deja utilisé. Peut etre est ce deja le votre, dans ce cas essayez de vous connecter";
          return;
        }
      },
      error: error => {
      }
    });
  }

  addUser(user : User){
    this.userService.addUser(user).subscribe({
      next: data => {
        userLogin.username = user.username;
        userLogin.password = user.password;
        this.router.navigate(['/profil']);
      },
      error: error => {
        this.error = true;
        this.messageErreur = "Erreur lors de l'inscription. Veuillez reessayer";
      },
    });
  }

  connexion(): void {
    //ne pas verifier les regex pour la connexion
    //si il y a un changement des regles il ne faut pas empecher ceux ayant un compte de se connecter

    let username : HTMLInputElement = <HTMLInputElement>document.getElementById("username");
    let password : HTMLInputElement = <HTMLInputElement>document.getElementById("password");

    this.userService.checkPassword(<string>username.value, <string>password.value).subscribe({
      next : valide =>{
        if (valide){
          userLogin.username = username.value;
          userLogin.password = password.value;
          this.router.navigate(['/profil']);
        }
        else{
          this.error = true;
          this.messageErreur = "Le mot de passe ou nom d'utilisateur est incorrect";
        }
      },
      error: error =>{}
    });
  }
}
