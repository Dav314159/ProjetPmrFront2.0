import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsreservationComponent } from './champsreservation.component';

describe('ChampsComponent', () => {
  let component: ChampsreservationComponent;
  let fixture: ComponentFixture<ChampsreservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampsreservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampsreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
