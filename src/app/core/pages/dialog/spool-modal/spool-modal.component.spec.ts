/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpoolModalComponent } from './spool-modal.component';

describe('SpoolModalComponent', () => {
  let component: SpoolModalComponent;
  let fixture: ComponentFixture<SpoolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
