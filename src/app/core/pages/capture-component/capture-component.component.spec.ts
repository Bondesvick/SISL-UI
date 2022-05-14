/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CapturePageComponent } from './capture-component.component';

describe('CaptureComponentComponent', () => {
  let component: CapturePageComponent;
  let fixture: ComponentFixture<CapturePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
