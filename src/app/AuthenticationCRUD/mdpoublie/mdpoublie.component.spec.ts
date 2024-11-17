import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpoubliComponent } from './mdpoublie.component';

describe('Forgotpass2Component', () => {
  let component: MdpoubliComponent;
  let fixture: ComponentFixture<MdpoubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdpoubliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdpoubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
