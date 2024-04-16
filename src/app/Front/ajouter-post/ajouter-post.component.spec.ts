import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPostComponent } from './ajouter-post.component';

describe('AjouterPostComponent', () => {
  let component: AjouterPostComponent;
  let fixture: ComponentFixture<AjouterPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
