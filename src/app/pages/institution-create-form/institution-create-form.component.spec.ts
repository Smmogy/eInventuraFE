import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionCreateFormComponent } from './institution-create-form.component';

describe('InstitutionCreateFormComponent', () => {
  let component: InstitutionCreateFormComponent;
  let fixture: ComponentFixture<InstitutionCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
