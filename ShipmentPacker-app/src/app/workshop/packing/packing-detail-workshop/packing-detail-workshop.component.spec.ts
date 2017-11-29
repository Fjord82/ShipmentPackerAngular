import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingDetailWorkshopComponent } from './packing-detail-workshop.component';

describe('PackingDetailWorkshopComponent', () => {
  let component: PackingDetailWorkshopComponent;
  let fixture: ComponentFixture<PackingDetailWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingDetailWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingDetailWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
