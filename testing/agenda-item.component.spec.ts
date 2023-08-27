import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemComponent } from '../src/app/agenda/agenda-item/agenda-item.component';

describe('AgendaItemComponent', () => {
  let component: AgendaItemComponent;
  let fixture: ComponentFixture<AgendaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaItemComponent]
    });
    fixture = TestBed.createComponent(AgendaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
