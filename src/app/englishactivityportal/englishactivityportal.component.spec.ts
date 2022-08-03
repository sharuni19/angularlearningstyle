import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishactivityportalComponent } from './englishactivityportal.component';

describe('EnglishactivityportalComponent', () => {
  let component: EnglishactivityportalComponent;
  let fixture: ComponentFixture<EnglishactivityportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishactivityportalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishactivityportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
