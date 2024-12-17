import {booleanAttribute, Component, inject, Input, QueryList, ViewChildren} from '@angular/core';
import {ChampsreservationComponent} from "./champsreservation/champsreservation.component";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

import {ReservationService} from "../services/reservation-service/reservation.service";
import {Reservation} from "../models/Reservation";
import {UserService} from "../services/user-service/user.service";
import {Observable} from "rxjs";
import {Pmr} from "../models/Pmr";
import {User} from "../models/User";
import {PmrService} from "../services/pmr-service/pmr.service";

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ChampsreservationComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.css'
})
export class MakeReservationComponent {
  constructor(private router: Router) {}

  @ViewChildren(ChampsreservationComponent) champsComponents!: QueryList<ChampsreservationComponent>;

  @Input({transform: booleanAttribute})
  isModification: boolean = false;

  reservationService = inject(ReservationService);
  userService = inject(UserService);
  pmrService = inject(PmrService);

  error : boolean = false;
  messageErreur : string = "Message d'erreur";

  validation : boolean = false;
  messageSucces : string = "Message de validation";

  userid : number = -1;
  pmrplace : number= -1;

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
      this.validation = false;
      this.error = true;
      this.messageErreur = "Tous les champs ne sont pas rempli";
      return;
    }

    let valide : boolean = this.verifRegex();
    if (valide){
      let pmr_id : HTMLInputElement = <HTMLInputElement>document.getElementById("pmr_id");
      let username : HTMLInputElement = <HTMLInputElement>document.getElementById("username");
      let reservation : HTMLInputElement = <HTMLInputElement>document.getElementById("reservation");
      this.checkPmrIdAndUsername(pmr_id.value,username.value,reservation.value);
    }
  }

  onSwitchMode() : void {
    this.isModification = !this.isModification;
  }

  checkPmrIdAndUsername(pmr_id:string, username:string, reservation:string){
    this.pmrService.checkpmrplace(parseInt(pmr_id)).subscribe({
      next : pmr =>{
        this.checkUsername(pmr_id, pmr.quantite,username,reservation);
      },
      error: error => {
        this.validation = false;
        this.error = true;
        this.messageErreur = "Le pmr id est incorrect";
      }
    })
  }

  checkUsername(pmr_id:string, pmr_place : number, username:string, reservation:string){
    this.userService.getUserIdByusername(username).subscribe({
      next : userId =>{
        if (!this.checkPlace(pmr_place, parseInt(reservation))){
          return;
        }

        let reservationvar: Reservation = new Reservation(userId, parseInt(pmr_id), parseInt(reservation))
        this.validation = true;
        this.error = false;

        if (this.isModification) {
          this.updateReservation(reservationvar)
        } else {
          this.addReservation(reservationvar)
        }
      },
      error: error => {
        this.validation = false;
        this.error = true;
        this.messageErreur = "Le username est incorrect";
      }
    })
  }

  verifRegex(){
    let regexValide : boolean = true;

    const correctValues: boolean[] = this.champsComponents.map(champ => champ.correct);
    for (let i = 0; i < this.champsComponents.length; i++) {
      regexValide = regexValide && (correctValues[i]);
    }

    if (!regexValide) {
      this.validation = false;
      this.error = true;
      this.messageErreur = "Le format d'un ou plusieurs champs n'est pas respecté";
    }

    return regexValide;
  }

  checkPlace(place : number, reservation : number) : boolean{
    if (place < reservation) {
      this.validation = false;
      this.error = true;
      this.messageErreur = "Le pmr n'a pas autant de place réduiser le nombre de places";
      return false;
    }
    return true;
  }

  updateReservation(reservation : Reservation){
    this.reservationService.updateReservation(reservation).subscribe({
      next: data => {
        this.validation = true;
        this.error = false;
        this.messageSucces = "Modification bien prise en compte";
        this.router.navigate(['/tablePmr']);
      },
      error: error => {
        this.validation = false;
        this.error = true;
        this.messageErreur = "Erreur lors de la modification des données. Veuillez reessayer";
      },
    });
  }

  addReservation(reservation : Reservation){
    this.reservationService.addReservation(reservation).subscribe({
      next: data => {
        this.validation = true;
        this.error = false;
        this.messageSucces = "Réservation bien prise en compte";
        this.router.navigate(['/tablePmr']);
      },
      error: error => {
        this.error = true;
        this.validation = false;
        this.messageErreur = "Erreur lors de la reservation. Veuillez reessayer";
      },
    });
  }
}
