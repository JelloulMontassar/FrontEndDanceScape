import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReclamationListComponent } from './my-reclamation-list.component';

describe('MyReclamationListComponent', () => {
  let component: MyReclamationListComponent;
  let fixture: ComponentFixture<MyReclamationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReclamationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReclamationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
