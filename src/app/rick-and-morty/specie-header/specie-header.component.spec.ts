import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieHeaderComponent } from './specie-header.component';

describe('SpecieHeaderComponent', () => {
  let component: SpecieHeaderComponent;
  let fixture: ComponentFixture<SpecieHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
