import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstorijaEditFormComponent } from './prostorija-edit-form.component';

describe('ProstorijaEditFormComponent', () => {
  let component: ProstorijaEditFormComponent;
  let fixture: ComponentFixture<ProstorijaEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProstorijaEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProstorijaEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
