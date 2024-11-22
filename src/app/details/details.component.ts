import {Component, inject, Input, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PmrService} from "../services/pmr-service/pmr.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
  service: PmrService = inject(PmrService);
  fb = inject(FormBuilder);
  pmr!: Pmr;
  form!: FormGroup;

  ngOnInit(): void {
    const pmrID: string = this.route.snapshot.paramMap.get("id") || 'michel';
    console.log(pmrID);

    this.pmr = this.service.getPmr(parseInt(pmrID));
    console.log("michel");
    this.form = this.fb.group({
      id: [this.pmr.id],
      name: [this.pmr.nom],
      capacity: [this.pmr.quantite],
      description: [this.pmr.description],
      geoPoint: [this.pmr.point_geo]
    })
  }

  protected readonly Pmr = Pmr;
}
