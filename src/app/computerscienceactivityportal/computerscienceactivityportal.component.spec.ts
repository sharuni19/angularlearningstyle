import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerscienceactivityportalComponent } from './computerscienceactivityportal.component';

describe('ComputerscienceactivityportalComponent', () => {
  let component: ComputerscienceactivityportalComponent;
  let fixture: ComponentFixture<ComputerscienceactivityportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerscienceactivityportalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerscienceactivityportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
