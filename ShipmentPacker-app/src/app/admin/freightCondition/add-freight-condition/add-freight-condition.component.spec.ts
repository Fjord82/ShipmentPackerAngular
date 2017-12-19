import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreightConditionComponent } from './add-freight-condition.component';

describe('AddFreightConditionComponent', () => {
  let component: AddFreightConditionComponent;
  let fixture: ComponentFixture<AddFreightConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFreightConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFreightConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
