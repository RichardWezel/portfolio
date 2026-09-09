import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteAutoScrollComponent } from './infinite-auto-scroll.component';

describe('InfiniteAutoScrollComponent', () => {
  let component: InfiniteAutoScrollComponent;
  let fixture: ComponentFixture<InfiniteAutoScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteAutoScrollComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfiniteAutoScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});