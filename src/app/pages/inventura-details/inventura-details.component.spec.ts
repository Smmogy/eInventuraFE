import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventuraDetailsComponent } from './inventura-details.component';

describe('InventuraDetailsComponent', () => {
  let component: InventuraDetailsComponent;
  let fixture: ComponentFixture<InventuraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventuraDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventuraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
