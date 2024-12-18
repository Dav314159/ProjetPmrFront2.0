import {AfterViewInit, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {Pmr} from "../models/Pmr";
import {PmrService} from "../services/pmr-service/pmr.service";
import {MatCell, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {UserService} from "../services/user-service/user.service";
import {MatSort, MatSortHeader, MatSortModule, Sort} from "@angular/material/sort";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ReservationFull} from "../models/ReservationFull";

@Component({
  selector: 'app-tableau-pmr',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgIf, MatIcon, MatIconButton],
  templateUrl: './tableau-pmr.component.html',
  styleUrl: './tableau-pmr.component.css'
})
export class TableauPmrComponent implements OnInit, AfterViewInit  {
  displayedColumns : string[] = ["id", "nom", "quantite", "description", "point_geo", "modifPmr","suppPmr"];
  datasourcePmr = new MatTableDataSource<Pmr>();

  @Input()
  type:string = "all";

  // Injection de dépendance
  constructor(private pmrService: PmrService,
              private router : Router) {
  }
  userService = inject(UserService);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    if (this.type == "all") {
      this.fillWithAll();
    }
    else if (this.type == "reservation"){
      this.fillWithReservation();
    }
  }

  fillWithAll() {
    this.datasourcePmr.data = [new Pmr(1,"",0,"","")];
    this.pmrService.getAllPmr().subscribe({
        next: data => {
          this.datasourcePmr.data = data;
        },
        error: error => { console.log('set data tableau error')}
      }
    )
  }

  fillWithReservation() {
    this.getData()
  }

  getData() {
    this.userService.getPmrReservation().subscribe({
        next: data => {
          this.datasourcePmr.data;
        },
        error: error => { console.log('error getting user reservation')}
      }
    );
  }

  ngAfterViewInit() {
    this.datasourcePmr.sort = this.sort;
    this.datasourcePmr.paginator = this.paginator;
  }

  makeReservation() {
    this.router.navigateByUrl('make-reservation')
  }

  onDetails(row : Pmr) :void {
    this.router.navigateByUrl('pmr-details/'+row.id);
  }

  onDelete(element : Pmr) {
    this.pmrService.deletePmr(element).subscribe(
      value => {this.getData()}
    );

  }
}
