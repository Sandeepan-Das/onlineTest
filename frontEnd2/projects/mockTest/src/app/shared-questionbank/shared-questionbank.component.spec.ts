import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedQuestionbankComponent } from './shared-questionbank.component';

describe('SharedQuestionbankComponent', () => {
  let component: SharedQuestionbankComponent;
  let fixture: ComponentFixture<SharedQuestionbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedQuestionbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedQuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
