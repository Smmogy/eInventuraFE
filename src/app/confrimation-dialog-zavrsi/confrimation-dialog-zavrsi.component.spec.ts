import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimationDialogZavrsiComponent } from './confrimation-dialog-zavrsi.component';

describe('ConfrimationDialogZavrsiComponent', () => {
  let component: ConfrimationDialogZavrsiComponent;
  let fixture: ComponentFixture<ConfrimationDialogZavrsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfrimationDialogZavrsiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfrimationDialogZavrsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
