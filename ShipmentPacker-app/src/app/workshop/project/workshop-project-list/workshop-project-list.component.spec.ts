import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopProjectListComponent } from './workshop-project-list.component';

describe('WorkshopProjectListComponent', () => {
  let component: WorkshopProjectListComponent;
  let fixture: ComponentFixture<WorkshopProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
