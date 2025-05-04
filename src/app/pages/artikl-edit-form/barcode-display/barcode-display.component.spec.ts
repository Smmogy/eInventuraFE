import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeDisplayComponent } from './barcode-display.component';

describe('BarcodeDisplayComponent', () => {
  let component: BarcodeDisplayComponent;
  let fixture: ComponentFixture<BarcodeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodeDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarcodeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
