import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColliEditComponent } from './admin-colli-edit.component';

describe('AdminColliEditComponent', () => {
  let component: AdminColliEditComponent;
  let fixture: ComponentFixture<AdminColliEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminColliEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminColliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
