import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColliComponent } from './add-colli.component';

describe('AddColliComponent', () => {
  let component: AddColliComponent;
  let fixture: ComponentFixture<AddColliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
