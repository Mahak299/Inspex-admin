import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenttypesComponent } from './componenttypes.component';

describe('ComponenttypesComponent', () => {
  let component: ComponenttypesComponent;
  let fixture: ComponentFixture<ComponenttypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponenttypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
