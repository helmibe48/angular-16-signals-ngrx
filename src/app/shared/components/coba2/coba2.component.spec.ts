import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coba2Component } from './coba2.component';

describe('Coba2Component', () => {
  let component: Coba2Component;
  let fixture: ComponentFixture<Coba2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Coba2Component]
    });
    fixture = TestBed.createComponent(Coba2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
