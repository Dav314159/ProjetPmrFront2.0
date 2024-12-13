import {Component, OnInit} from '@angular/core';
import {Reservation} from "../models/Reservation";
import {ReservationService} from "../services/reservation-service/reservation.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tableau_reservation',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tableau_reservation.component.html',
  styleUrl: './tableau_reservation.component.css'
})
export class Tableau_reservationComponent implements OnInit {
  displayedColumns : string[] = ["idPmr", "idUtilisateur", "reservation"];
  datasourceReservation = new ReservationDataSource([]);

  // Injection de dépendance
  constructor(private ReservationService: ReservationService,
              private router : Router) {
  }

  ngOnInit() {
    this.ReservationService.getAllReservation().subscribe({
        next: data => {
          this.datasourceReservation.setData(data);
        },
        error: error => { console.log('set data tableau error')}
      }
    )
  }

  onDetails(row : Reservation) :void {
    this.router.navigateByUrl('reservation-details/'+row.pmr_id);
  }
}

class ReservationDataSource extends DataSource<Reservation> {
  private _dataStream = new ReplaySubject<Reservation[]>();

  constructor(initialData: Reservation[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Reservation[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Reservation[]) {
    this._dataStream.next(data);
  }
}


