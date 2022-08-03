import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersciencequestionnairesComponent } from './computersciencequestionnaires.component';

describe('ComputersciencequestionnairesComponent', () => {
  let component: ComputersciencequestionnairesComponent;
  let fixture: ComponentFixture<ComputersciencequestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputersciencequestionnairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputersciencequestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
