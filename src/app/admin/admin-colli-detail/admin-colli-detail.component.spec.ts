import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColliDetailComponent } from './admin-colli-detail.component';

describe('AdminColliDetailComponent', () => {
  let component: AdminColliDetailComponent;
  let fixture: ComponentFixture<AdminColliDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminColliDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminColliDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
