import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminAllComponent } from './dashboard-admin-all.component';

describe('DashboardAdminAllComponent', () => {
  let component: DashboardAdminAllComponent;
  let fixture: ComponentFixture<DashboardAdminAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAdminAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdminAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
