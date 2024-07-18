import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsFormComponent } from './institutions-form.component';

describe('InstitutionsFormComponent', () => {
  let component: InstitutionsFormComponent;
  let fixture: ComponentFixture<InstitutionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
