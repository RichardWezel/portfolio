import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitchBtnComponent } from './language-switch-btn.component';

describe('LanguageSwitchBtnComponent', () => {
  let component: LanguageSwitchBtnComponent;
  let fixture: ComponentFixture<LanguageSwitchBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitchBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageSwitchBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});