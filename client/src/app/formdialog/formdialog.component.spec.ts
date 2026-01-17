import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdialogComponent } from './formdialog.component';

describe('FormdialogComponent', () => {
  let component: FormdialogComponent;
  let fixture: ComponentFixture<FormdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormdialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
