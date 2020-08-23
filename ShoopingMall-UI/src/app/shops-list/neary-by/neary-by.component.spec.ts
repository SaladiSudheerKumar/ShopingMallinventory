import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearyByComponent } from './neary-by.component';

describe('NearyByComponent', () => {
  let component: NearyByComponent;
  let fixture: ComponentFixture<NearyByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearyByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearyByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
