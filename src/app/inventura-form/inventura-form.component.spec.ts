import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventuraFormComponent } from './inventura-form.component';

describe('InventuraFormComponent', () => {
  let component: InventuraFormComponent;
  let fixture: ComponentFixture<InventuraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventuraFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventuraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
