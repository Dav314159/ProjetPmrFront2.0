import {Component, inject, Input, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PmrService} from "../services/pmr-service/pmr.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  service: PmrService = inject(PmrService);
  fb = inject(FormBuilder);
  pmr!: Pmr;
  form = this.fb.group({
    id: new FormControl({value: 0, disabled: true}),
    name: new FormControl(""),
    capacity: new FormControl(0),
    description: new FormControl(0),
    geoPoint1: new FormControl(""),
    geoPoint2: new FormControl(""),
  })

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
          this.pmr = new Pmr(-1, "", 0, 0, "");
        },
        complete: () => {
          // Le reste de la logique de la méthode d'origine est ici car subscribe est vicieuse est n'est pas bloquante pour le code :)
          if (this.pmr.id < 0)
          {
            console.log("Erreur 404");
            //this.router.navigateByUrl("http://localhost:4200/erreur404");
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

  protected readonly Pmr = Pmr;
}
