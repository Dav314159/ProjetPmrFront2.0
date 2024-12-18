import {booleanAttribute, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Reservation} from "../models/Reservation";
import {ReservationService} from "../services/reservation-service/reservation.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from "rxjs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user-service/user.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReservationFull} from "../models/ReservationFull";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tableau_reservation',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginator],
  templateUrl: './tableau_reservation.component.html',
  styleUrl: './tableau_reservation.component.css'
})
export class Tableau_reservationComponent implements OnInit {
  displayedColumns : string[] = ["nom", "description", "reservation", "suppReservation"];
  datasourceReservation = new MatTableDataSource<Reservation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Injection de dépendance
  constructor(private ReservationService: ReservationService,
              private userService: UserService,
              private router : Router) {
  }

  ngOnInit() {
    this.getData()
  }

  ngAfterViewInit() {
    this.datasourceReservation.sort = this.sort;
    this.datasourceReservation.paginator = this.paginator;
  }

  getData() {
    this.ReservationService.getAllReservationByUsername(this.userService.username).subscribe({
        next: data => {
          this.datasourceReservation.data = data;
        },
        error: error => { console.log('set data tableau error') }
      }
    )
  }

  makeReservation() {
    this.router.navigateByUrl('make-reservation')
  }

  onDelete(element : ReservationFull) {
    this.ReservationService.deleteReservation(element).subscribe(
      value => {this.getData()}
    );

  }
}
