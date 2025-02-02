import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentvariationsComponent } from './componentvariations.component';

describe('ComponentvariationsComponent', () => {
  let component: ComponentvariationsComponent;
  let fixture: ComponentFixture<ComponentvariationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentvariationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentvariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
