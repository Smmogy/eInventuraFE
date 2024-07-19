import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiklCreateFormComponent } from './artikl-create-form.component';

describe('ArtiklCreateFormComponent', () => {
  let component: ArtiklCreateFormComponent;
  let fixture: ComponentFixture<ArtiklCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtiklCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtiklCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
