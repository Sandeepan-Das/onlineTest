import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormatComponent } from './test-format.component';

describe('TestFormatComponent', () => {
  let component: TestFormatComponent;
  let fixture: ComponentFixture<TestFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
