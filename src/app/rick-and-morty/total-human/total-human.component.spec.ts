import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalHumanComponent } from './total-human.component';

describe('TotalHumanComponent', () => {
  let component: TotalHumanComponent;
  let fixture: ComponentFixture<TotalHumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalHumanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalHumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
