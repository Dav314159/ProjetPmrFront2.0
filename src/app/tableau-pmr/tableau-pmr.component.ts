import {Component, OnInit} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {PmrService} from "../services/pmr-service/pmr.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from "rxjs";
import {MatTableModule} from "@angular/material/table";

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
  constructor(private pmrService: PmrService) {
  }

  ngOnInit() {
    this.datasourcePmr.setData([
      new Pmr(1,
        "Rue Saint-Venant",
        2,
        null,
        "47.3846322409, 0.5565788835"
      )
    ])

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
