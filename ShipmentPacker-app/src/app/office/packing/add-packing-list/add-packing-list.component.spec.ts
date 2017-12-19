import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackingListComponent } from './add-packing-list.component';

describe('AddPackingListComponent', () => {
  let component: AddPackingListComponent;
  let fixture: ComponentFixture<AddPackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
