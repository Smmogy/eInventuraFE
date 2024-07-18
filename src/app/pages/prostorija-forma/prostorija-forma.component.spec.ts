import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstorijaFormaComponent } from './prostorija-forma.component';

describe('ProstorijaFormaComponent', () => {
  let component: ProstorijaFormaComponent;
  let fixture: ComponentFixture<ProstorijaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProstorijaFormaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProstorijaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
