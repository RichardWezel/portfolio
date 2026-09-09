import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SkillSetComponent } from './skill-set.component';

describe('SkillSetComponent', () => {
  let component: SkillSetComponent;
  let fixture: ComponentFixture<SkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSetComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});