import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DetailsComponent} from "./details/details.component";

export const routes: Routes = [
  {path: "details/:id", component: DetailsComponent},
];
