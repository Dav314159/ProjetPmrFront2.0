import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmrDetailsComponent } from './pmr-details.component';

describe('DetailsComponent', () => {
  let component: PmrDetailsComponent;
  let fixture: ComponentFixture<PmrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmrDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
