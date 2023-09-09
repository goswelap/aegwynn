import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemEditComponent } from '../src/app/agenda/agenda-item-edit/agenda-item-edit.component';

describe('AgendaItemEditComponent', () => {
  let component: AgendaItemEditComponent;
  let fixture: ComponentFixture<AgendaItemEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaItemEditComponent]
    });
    fixture = TestBed.createComponent(AgendaItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
