import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutredetailsComponent } from './offredetails.component';

describe('AutredetailsComponent', () => {
  let component: AutredetailsComponent;
  let fixture: ComponentFixture<AutredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutredetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
