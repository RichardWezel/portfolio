import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleaguesVoicesComponent } from './colleagues-voices.component';

describe('ColleaguesVoicesComponent', () => {
  let component: ColleaguesVoicesComponent;
  let fixture: ComponentFixture<ColleaguesVoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColleaguesVoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColleaguesVoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
