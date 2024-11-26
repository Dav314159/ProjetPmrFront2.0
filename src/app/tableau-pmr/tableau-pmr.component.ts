import {Component, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {PmrService} from "../services/pmr-service/pmr.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tableau-pmr',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tableau-pmr.component.html',
  styleUrl: './tableau-pmr.component.css'
})
export class TableauPmrComponent implements OnInit {
  displayedColumns : string[] = ["idPmr", "name", "capacity", "description", "geoPoint"];
  datasourcePmr = new PmrDataSource([]);

  // Injection de dépendance
  constructor(private pmrService: PmrService,
              private router : Router) {
  }

  ngOnInit() {
    this.pmrService.getAllPmr().subscribe({
      next: data => {
        this.datasourcePmr.setData(data);
      },
      error: error => { console.log('set data tableau error')}
      }
    )
  }

  onDetails(row : Pmr) :void {
    this.router.navigateByUrl('pmr-details/'+row.id);
  }
}


class PmrDataSource extends DataSource<Pmr> {
  private _dataStream = new ReplaySubject<Pmr[]>();

  constructor(initialData: Pmr[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Pmr[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Pmr[]) {
    this._dataStream.next(data);
  }
}
