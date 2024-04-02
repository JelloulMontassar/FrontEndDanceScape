import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCodeComponent } from './short-code.component';

describe('ShortCodeComponent', () => {
  let component: ShortCodeComponent;
  let fixture: ComponentFixture<ShortCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
