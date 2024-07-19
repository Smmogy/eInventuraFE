import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstorijaFormComponent } from './prostorija-form.component';

describe('ProstorijaFormComponent', () => {
  let component: ProstorijaFormComponent;
  let fixture: ComponentFixture<ProstorijaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProstorijaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProstorijaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
