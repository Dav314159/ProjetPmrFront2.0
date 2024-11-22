import { Routes } from '@angular/router';
import {TableauPmrComponent} from "./tableau-pmr/tableau-pmr.component";
import {AppComponent} from "./app.component";
import {DetailsComponent} from "./details/details.component";
import {Error404Component} from "./error404/error404.component";

export const routes: Routes = [
  {path: '', redirectTo: "tablePmr", pathMatch: "full"},
  {path: "details/:id", component: DetailsComponent},
  {path: 'tablePmr', component: TableauPmrComponent},
  {path: '**', component: Error404Component}
];
