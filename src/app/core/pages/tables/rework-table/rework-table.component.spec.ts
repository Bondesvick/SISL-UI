/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReworkTableComponent } from './rework-table.component';

describe('ReworkTableComponent', () => {
  let component: ReworkTableComponent;
  let fixture: ComponentFixture<ReworkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReworkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReworkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
