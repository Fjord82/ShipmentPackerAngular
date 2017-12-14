import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFreightConditionComponent } from './edit-freight-condition.component';

describe('EditFreightConditionComponent', () => {
  let component: EditFreightConditionComponent;
  let fixture: ComponentFixture<EditFreightConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFreightConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFreightConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
