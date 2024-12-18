import { Routes } from '@angular/router';
import {TableauPmrComponent} from "./tableau-pmr/tableau-pmr.component";
import {PmrDetailsComponent} from "./pmr-details/pmr-details.component";
import {Error404Component} from "./error404/error404.component";
import {CarteComponent} from "./carte/carte.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {ProfilComponent} from "./profil/profil.component";
import {Tableau_reservationComponent} from "./tableau_reservation/tableau_reservation.component";
import {MakeReservationComponent} from "./make-reservation/make-reservation.component";

export const routes: Routes = [
  {path: '', redirectTo: "tablePmr", pathMatch: "full"},
  {path: "pmr-details/:id", component: PmrDetailsComponent},
  {path: 'tablePmr', component: TableauPmrComponent},
  {path: 'carte', component: CarteComponent},
  {path: 'tableau_reservation',component: Tableau_reservationComponent},
  {path: 'make-reservation', component: MakeReservationComponent},



  {path: 'connexion', component: ConnexionComponent},
  {path: 'profil', component: ProfilComponent},
  {path: '**', component: Error404Component}
];
