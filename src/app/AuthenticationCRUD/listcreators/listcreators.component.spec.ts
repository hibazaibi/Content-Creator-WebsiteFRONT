import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcreatorsComponent } from './listcreators.component';

describe('RegisterComponent', () => {
  let component: ListcreatorsComponent;
  let fixture: ComponentFixture<ListcreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcreatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
