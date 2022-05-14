/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountnameValidationComponent } from './accountname-validation.component';

describe('AccountnameValidationComponent', () => {
  let component: AccountnameValidationComponent;
  let fixture: ComponentFixture<AccountnameValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountnameValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountnameValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
