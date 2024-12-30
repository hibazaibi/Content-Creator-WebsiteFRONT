import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatordashboardComponent } from './creatordashboard.component';

describe('CreatordashboardComponent', () => {
  let component: CreatordashboardComponent;
  let fixture: ComponentFixture<CreatordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatordashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
