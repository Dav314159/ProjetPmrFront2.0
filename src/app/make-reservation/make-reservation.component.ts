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

  ReservationService = inject(ReservationService);
  UserService = inject(UserService);
  PmrService = inject(PmrService);

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

    if (this.isModification) {
      this.modifier();
    } else {
      this.reserver();
    }
  }

  onSwitchMode() : void {
    this.isModification = !this.isModification;
  }

  modifier() : void{
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
    else{
      let pmr_id : HTMLInputElement = <HTMLInputElement>document.getElementById("pmr_id");
      let username : HTMLInputElement = <HTMLInputElement>document.getElementById("username");
      let reservation : HTMLInputElement = <HTMLInputElement>document.getElementById("reservation");



      if(this.ReservationService.checkdata(pmr_id.value as unknown as number, username as unknown as string)){
        this.getUseridByUsername(username);
        let utilisateur_id: number = this.userid;
        this.checkpmrplace(pmr_id.value as unknown as number)
        if (this.pmrplace <= (reservation.value as unknown as number)) {

          let reservationvar: Reservation = new Reservation(pmr_id.value as unknown as number, utilisateur_id, reservation.value as unknown as number)
          this.validation = true;
          this.error = false;
          this.updateReservation(reservationvar)
          this.router.navigate(['/tablePmr']);
        }else {
          this.validation = false;
          this.error = true;
          this.messageErreur = "Le pmr n'a pas autant de place réduiser le nombre de places";
        }
      }
      else{
        this.validation = false;
        this.error = true;
        this.messageErreur = "Le pmr id, le username ou le nombre de place est incorrect";
      }



    }
  }

  reserver(): void {

    let regexValide: boolean = true;

    const correctValues: boolean[] = this.champsComponents.map(champ => champ.correct);
    for (let i = 0; i < this.champsComponents.length; i++) {
      regexValide = regexValide && (correctValues[i]);
    }

    if (!regexValide) {
      this.validation = false;
      this.error = true;
      this.messageErreur = "Le format d'un ou plusieurs champs n'est pas respecté";
    } else {
      let pmr_id: HTMLInputElement = <HTMLInputElement>document.getElementById("pmr_id");
      let username: HTMLInputElement = <HTMLInputElement>document.getElementById("username");
      let reservation: HTMLInputElement = <HTMLInputElement>document.getElementById("reservation");


      if (this.ReservationService.checkdata(pmr_id.value as unknown as number, username as unknown as string)) {
        this.getUseridByUsername(username);
        let utilisateur_id: number = this.userid;
        this.checkpmrplace(pmr_id.value as unknown as number)
        if (this.pmrplace <= (reservation.value as unknown as number)){

          let reservationvar: Reservation = new Reservation(pmr_id.value as unknown as number, utilisateur_id, reservation.value as unknown as number)

          this.validation = true;
          this.error = false;
          this.addReservation(reservationvar)
          this.router.navigate(['/tablePmr']);

        }else {
          this.validation = false;
          this.error = true;
          this.messageErreur = "Le pmr n'a pas autant de place réduiser le nombre de places";
        }

      } else {
        this.validation = false;
        this.error = true;
        this.messageErreur = "Le pmr id, le username est incorrect";
      }
    }
  }


  updateReservation(reservation : Reservation){
    this.ReservationService.updateReservation(reservation).subscribe({
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
    this.ReservationService.addReservation(reservation).subscribe({
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

  private getUseridByUsername(username: HTMLInputElement) {
     this.UserService.getUserByusername(username as unknown as string).subscribe(
      {
        next: (response: User) => {
          console.log("next ", response);
          this.userid = response.id;

        },
        error: error => {
          this.validation = false;
          this.error = true;
          this.messageErreur = "Le username est incorrect";
        }
      }
    )

  }

  private checkpmrplace(pmr_id: number)  {
    this.PmrService.checkpmrplace(pmr_id).subscribe({
      next: (response: Pmr) => {
        console.log("next ", response);
        this.pmrplace = response.quantite;

      },
      error: error => {
        this.validation = false;
        this.error = true;
        this.messageErreur = "Le numero du pmr est incorrect";
      }
    })
  }
}
