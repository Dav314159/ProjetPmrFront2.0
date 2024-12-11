import { Component } from '@angular/core';
import {ChampsComponent} from "./champs/champs.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ChampsComponent,
    CommonModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  isSignUp: boolean = false;

  onSubmit(): void {
    if (this.isSignUp) {
      console.log('Inscription 🦆');
      // Récupère les données et traite l'inscription
    } else {
      console.log('Connexion 🦆');
      // Récupère les données et traite la connexion
    }
  }

  onSwitchMode() : void {
    this.isSignUp = !this.isSignUp;
  }
}
