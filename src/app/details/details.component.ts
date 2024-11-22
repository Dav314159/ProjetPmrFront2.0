import {Component, inject, Input, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PmrService} from "../services/pmr-service/pmr.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
  form!: FormGroup;

  ngOnInit(): void {
    const pmrID: string = this.route.snapshot.paramMap.get("id") || '';

    this.pmr = this.service.getPmr(parseInt(pmrID));
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

  protected readonly Pmr = Pmr;
}
