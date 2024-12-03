import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmarkerComponent } from './popupmarker.component';

describe('PopupmarkerComponent', () => {
  let component: PopupmarkerComponent;
  let fixture: ComponentFixture<PopupmarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupmarkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
