import { Routes } from '@angular/router';
import {TableauPmrComponent} from "./tableau-pmr/tableau-pmr.component";
import {PmrDetailsComponent} from "./pmr-details/pmr-details.component";
import {Error404Component} from "./error404/error404.component";

export const routes: Routes = [
  {path: '', redirectTo: "tablePmr", pathMatch: "full"},
  {path: "pmr-details/:id", component: PmrDetailsComponent},
  {path: 'tablePmr', component: TableauPmrComponent},
  {path: '**', component: Error404Component}
];
