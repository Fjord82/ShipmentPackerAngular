import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackingDetailComponent } from './admin-packing-detail.component';

describe('AdminPackingDetailComponent', () => {
  let component: AdminPackingDetailComponent;
  let fixture: ComponentFixture<AdminPackingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPackingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
