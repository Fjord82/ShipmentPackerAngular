import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColliComponent } from './edit-colli.component';

describe('EditColliComponent', () => {
  let component: EditColliComponent;
  let fixture: ComponentFixture<EditColliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditColliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
