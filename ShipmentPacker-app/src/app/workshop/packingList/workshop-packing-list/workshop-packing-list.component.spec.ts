import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPackingListComponent } from './workshop-packing-list.component';

describe('WorkshopPackingListComponent', () => {
  let component: WorkshopPackingListComponent;
  let fixture: ComponentFixture<WorkshopPackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopPackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
