import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau_reservationComponent } from './tableau_reservation.component';

describe('ReservationComponent', () => {
  let component: Tableau_reservationComponent;
  let fixture: ComponentFixture<Tableau_reservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tableau_reservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableau_reservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
