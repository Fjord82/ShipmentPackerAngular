import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectDetailComponent } from './admin-project-detail.component';

describe('AdminProjectDetailComponent', () => {
  let component: AdminProjectDetailComponent;
  let fixture: ComponentFixture<AdminProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
