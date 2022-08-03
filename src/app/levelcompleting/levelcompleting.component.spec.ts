import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelcompletingComponent } from './levelcompleting.component';

describe('LevelcompletingComponent', () => {
  let component: LevelcompletingComponent;
  let fixture: ComponentFixture<LevelcompletingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelcompletingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelcompletingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
