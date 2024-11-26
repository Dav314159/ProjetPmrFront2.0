import {Component, inject, Input, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PmrService} from "../services/pmr-service/pmr.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pmr-details',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, NgIf
  ],
  templateUrl: './pmr-details.component.html',
  styleUrl: './pmr-details.component.css'
})
export class PmrDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  service: PmrService = inject(PmrService);
  fb = inject(FormBuilder);
  pmr!: Pmr;
  form = this.fb.group({
    id: new FormControl({value: 0, disabled: true}),
    name: new FormControl(""),
    capacity: new FormControl(0),
    description: new FormControl(""),
    geoPoint1: new FormControl(""),
    geoPoint2: new FormControl(""),
  })

  modificationConfirmee = false;

  ngOnInit(): void {
    const pmrID: string = this.route.snapshot.paramMap.get("id") || '';
    console.log(pmrID);

    console.log("OnInit 1", this.pmr);
    this.service.getPmr(parseInt(pmrID)).subscribe(
      {
        next: (response: Pmr) => {
          console.log("next ", response);
          this.pmr = response;
        },
        error: (message) => {
          console.log("error ", message);
          this.pmr = new Pmr(-1, "", 0, "", "");
        },
        complete: () => {
          // Le reste de la logique de la méthode d'origine est ici car subscribe est vicieuse est n'est pas bloquante pour le code :)
          if (this.pmr.id < 0)
          {
            console.log("Erreur 404");
            this.router.navigateByUrl("http://localhost:4200/erreur404");
          }

          this.form = this.fb.group({
            id: new FormControl({value: this.pmr.id, disabled: true}),
            name: new FormControl(this.pmr.nom),
            capacity: new FormControl(this.pmr.quantite),
            description: new FormControl(this.pmr.description),
            geoPoint1: new FormControl(this.pmr.point_geo.split(", ")[0]),
            geoPoint2: new FormControl(this.pmr.point_geo.split(", ")[1]),
          })
        }
      }
    );
    console.log("OnInit 2", this.pmr);
  }

  onClickBoutonConfirmer(): void {

    this.service.updatePmr( new Pmr(this.form.get("id")?.value ?? 0,
                                    this.form.get("name")?.value ?? "",
                                    this.form.get("capacity")?.value ?? 0,
                                    this.form.get("description")?.value ?? "",
                                    this.form.get("geoPoint1")?.value + ', ' + this.form.get("geoPoint2")?.value))
      .subscribe({
        next: () => {
          this.modificationConfirmee = true;
        },
        error: () => {
          console.log("error updatePMR");
        }
      })


  }

}
