/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NinValidationComponent } from './nin-validation.component';

describe('NinValidationComponent', () => {
  let component: NinValidationComponent;
  let fixture: ComponentFixture<NinValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NinValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NinValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
