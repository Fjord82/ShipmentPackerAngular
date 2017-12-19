import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackingEditComponent } from './admin-packing-edit.component';

describe('AdminPackingEditComponent', () => {
  let component: AdminPackingEditComponent;
  let fixture: ComponentFixture<AdminPackingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPackingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPackingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
