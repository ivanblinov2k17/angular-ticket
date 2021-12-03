import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotGrigComponent } from './pivot-grig.component';

describe('PivotGrigComponent', () => {
  let component: PivotGrigComponent;
  let fixture: ComponentFixture<PivotGrigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotGrigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotGrigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
