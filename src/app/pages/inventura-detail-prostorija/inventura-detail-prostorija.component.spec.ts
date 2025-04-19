import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventuraDetailProstorijaComponent } from './inventura-detail-prostorija.component';

describe('InventuraDetailProstorijaComponent', () => {
  let component: InventuraDetailProstorijaComponent;
  let fixture: ComponentFixture<InventuraDetailProstorijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventuraDetailProstorijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventuraDetailProstorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
