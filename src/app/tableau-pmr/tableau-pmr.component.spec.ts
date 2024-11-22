import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauPmrComponent } from './tableau-pmr.component';

describe('TableauPmrComponent', () => {
  let component: TableauPmrComponent;
  let fixture: ComponentFixture<TableauPmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauPmrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableauPmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
