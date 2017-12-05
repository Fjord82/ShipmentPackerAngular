import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColliDetailComponent } from './colli-detail.component';

describe('ColliDetailComponent', () => {
  let component: ColliDetailComponent;
  let fixture: ComponentFixture<ColliDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColliDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColliDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
