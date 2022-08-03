import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishquestionnairesComponent } from './englishquestionnaires.component';

describe('EnglishquestionnairesComponent', () => {
  let component: EnglishquestionnairesComponent;
  let fixture: ComponentFixture<EnglishquestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishquestionnairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishquestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
