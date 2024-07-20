import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiklEditFormComponent } from './artikl-edit-form.component';

describe('ArtiklEditFormComponent', () => {
  let component: ArtiklEditFormComponent;
  let fixture: ComponentFixture<ArtiklEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtiklEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtiklEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
