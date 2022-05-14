/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReworkReasonComponent } from './rework-reason.component';

describe('ReworkReasonComponent', () => {
  let component: ReworkReasonComponent;
  let fixture: ComponentFixture<ReworkReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReworkReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReworkReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
