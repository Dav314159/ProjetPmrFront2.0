import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {PmrService} from "../services/pmr-service/pmr.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-tableau-pmr',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tableau-pmr.component.html',
  styleUrl: './tableau-pmr.component.css'
})
export class TableauPmrComponent implements OnInit, AfterViewInit  {
  displayedColumns : string[] = ["idPmr", "name", "capacity", "description", "geoPoint"];
  datasourcePmr = new MatTableDataSource<Pmr>();

  // Injection de dépendance
  constructor(private pmrService: PmrService,
              private router : Router) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.pmrService.getAllPmr().subscribe({
      next: data => {
        this.datasourcePmr.data = data;
      },
      error: error => { console.log('set data tableau error')}
      }
    )
  }

  ngAfterViewInit() {
    this.datasourcePmr.paginator = this.paginator;
    this.datasourcePmr.sort = this.sort;
  }

  onDetails(row : Pmr) :void {
    this.router.navigateByUrl('pmr-details/'+row.id);
  }
}
