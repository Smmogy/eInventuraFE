import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiklFormComponent } from './artikl-form.component';

describe('ArtiklFormComponent', () => {
  let component: ArtiklFormComponent;
  let fixture: ComponentFixture<ArtiklFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtiklFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtiklFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
