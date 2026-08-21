import { Component, inject, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { NavbarComponent } from '../main-content/navbar/navbar.component';
import { FooterComponent } from '../main-content/footer/footer.component';
import { MenuComponent } from '../main-content/menu/menu.component';
import { cvStations } from './career-data';

interface PathPoint {
  x: number;
  y: number;
}

const DESKTOP_BREAKPOINT = 900;
const CURVE_AMPLITUDE = 90;

@Component({
  selector: 'app-cv-timeline',
  standalone: true,
  imports: [CommonModule, SharedModule, NavbarComponent, FooterComponent, MenuComponent],
  templateUrl: './cv-timeline.component.html',
  styleUrls: ['./cv-timeline.component.scss', './cv-timeline.mobile.scss']
})
export class CvTimelineComponent implements AfterViewInit, OnDestroy {

  router = inject(Router)

  stations = cvStations;

  @ViewChild('stationsContainer') stationsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('curvePath') curvePath!: ElementRef<SVGPathElement>;
  @ViewChildren('stationContent') stationContents!: QueryList<ElementRef<HTMLDivElement>>;

  pathD = '';
  svgHeight = 0;
  isDesktopLayout = window.innerWidth > DESKTOP_BREAKPOINT;
  dotPositions: PathPoint[] = [];
  navbarHasBackground = false;

  private pathTotalLength = 0;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  private progressTicking = false;
  // Scroll position at the moment the page was laid out (usually 0). The
  // line fill starts at 0 there and reaches 100% exactly at the bottom of
  // the page — it never starts pre-filled and always reaches completion.
  private baselineScrollTop = 0;

  // The site's global overflow-x:hidden on html+body makes <body> its own
  // scroll container instead of the window, so 'scroll' doesn't reliably
  // reach window/document — listen on body directly as well.
  private readonly onBodyScroll = (): void => this.queueProgressUpdate();

  toMain() {
    this.router.navigate(['/'])
  }

  ngAfterViewInit(): void {
    // Force a clean scroll position on entry. Without this, a scroll position
    // carried over from the previous route (the body/window scroll split
    // described below makes Angular's own scroll restoration unreliable here)
    // would throw off the 0%-at-top / 100%-at-bottom baseline the fill relies on.
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);

    this.recalculate();
    document.body.addEventListener('scroll', this.onBodyScroll, { passive: true });
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('scroll', this.onBodyScroll);
    clearTimeout(this.resizeTimeout);
  }

  @HostListener('window:resize')
  onResize(): void {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.recalculate(), 150);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.queueProgressUpdate();
  }

  private queueProgressUpdate(): void {
    if (this.progressTicking) {
      return;
    }
    this.progressTicking = true;
    requestAnimationFrame(() => {
      this.updateProgress();
      this.navbarHasBackground = document.body.scrollTop > 10 || window.scrollY > 10;
      this.progressTicking = false;
    });
  }

  private recalculate(): void {
    if (window.innerWidth <= DESKTOP_BREAKPOINT) {
      this.isDesktopLayout = false;
      return;
    }
    this.isDesktopLayout = true;

    const container = this.stationsContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    const centerX = container.clientWidth / 2;
    this.svgHeight = container.scrollHeight;
    this.baselineScrollTop = document.body.scrollTop || window.scrollY;

    const targetPoints: PathPoint[] = this.stationContents.toArray().map((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      const y = rect.top - containerRect.top + rect.height / 2;
      // Curve bulges toward the empty side of the row, away from the text.
      const x = i % 2 === 0 ? centerX + CURVE_AMPLITUDE : centerX - CURVE_AMPLITUDE;
      return { x, y };
    });

    this.pathD = this.buildSmoothPath(targetPoints);

    // Let the [attr.d] binding render before we query the real path geometry.
    setTimeout(() => {
      const pathEl = this.curvePath?.nativeElement;
      if (pathEl) {
        this.pathTotalLength = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${this.pathTotalLength}`;
        this.updateProgress();
      }
      this.dotPositions = this.computeDotPositionsOnPath(targetPoints);
    });
  }

  private updateProgress(): void {
    const pathEl = this.curvePath?.nativeElement;
    if (!this.isDesktopLayout || !pathEl || !this.pathTotalLength) {
      return;
    }
    const scrollTop = document.body.scrollTop || window.scrollY;
    const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const maxScroll = scrollHeight - window.innerHeight;
    const scrollRange = maxScroll - this.baselineScrollTop;
    const progress = scrollRange > 0
      ? Math.min(1, Math.max(0, (scrollTop - this.baselineScrollTop) / scrollRange))
      : 0;
    pathEl.style.strokeDashoffset = `${this.pathTotalLength * (1 - progress)}`;
  }

  private buildSmoothPath(points: PathPoint[]): string {
    if (!points.length) {
      return '';
    }
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midY = (p0.y + p1.y) / 2;
      d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
    }
    return d;
  }

  private computeDotPositionsOnPath(targetPoints: PathPoint[]): PathPoint[] {
    const pathEl = this.curvePath?.nativeElement;
    if (!pathEl || !targetPoints.length) {
      return [];
    }

    const steps = 500;
    const samples: PathPoint[] = [];
    for (let s = 0; s <= steps; s++) {
      const point = pathEl.getPointAtLength((s / steps) * this.pathTotalLength);
      samples.push({ x: point.x, y: point.y });
    }

    return targetPoints.map(target => {
      let closest = samples[0];
      let minDiff = Infinity;
      for (const sample of samples) {
        const diff = Math.abs(sample.y - target.y);
        if (diff < minDiff) {
          minDiff = diff;
          closest = sample;
        }
      }
      return closest;
    });
  }
}
