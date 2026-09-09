import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ArrowBtnComponent } from './arrow-btn.component';

describe('ArrowBtnComponent', () => {
  let component: ArrowBtnComponent;
  let fixture: ComponentFixture<ArrowBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowBtnComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});