import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavComponent } from '../src/app/header-nav/header-nav.component';

describe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNavComponent]
    });
    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
