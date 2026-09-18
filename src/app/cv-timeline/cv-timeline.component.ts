import {
  Component, ElementRef, HostListener, OnDestroy, OnInit, AfterViewInit,
  PLATFORM_ID, QueryList, ViewChild, ViewChildren, inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../main-content/navbar/navbar.component';
import { FooterComponent } from '../main-content/footer/footer.component';
import {
  CV_CATEGORIES, CV_CATEGORY_COLOR, CvCategory, CvRowMeta, cvRows, cvStations, cvSummary
} from './career-data';

/** Textfelder einer Station, wie sie in CV-TIMELINE.stations.<id> liegen. */
interface CvStationText {
  y: string;
  dur: string;
  t: string;
  o: string;
  m: string;
  lead: string;
  ab?: string;
  px?: string[];
  zg?: string;
  zgSrc?: string;
  sk: string[];
  pr: string[];
}

export interface CvCard extends CvStationText {
  id: string;
  cat: CvCategory;
  color: string;
  catLabel: string;
}

export interface CvRow {
  yearTop: string;
  yearBot: string;
  side: 'l' | 'r';
  markerColor: string;
  main: CvCard[];
  para: CvCard[];
}

interface Chip {
  key: CvCategory | null;
  label: string;
  count: number;
  color: string;
}

interface PathPoint {
  x: number;
  y: number;
}

/** Ab dieser Breite liegt die Linie in der Mitte, darunter links. */
const DESKTOP_BREAKPOINT = 900;
/** Spaltenraster der Desktop-Zeile: Jahr | Karte | Mittelrinne | Karte. */
const YEAR_COL = 88;
const GUTTER = 96;
/** X-Position der Linie im Mobile-Layout. */
const MOBILE_SPINE_X = 12;

/** Start-/Endjahr aus "Nov 2023 – 2026" o. ä.; fehlt das Ende, gilt der Start. */
function yearSpan(y: string): [number, number] {
  const years = (y.match(/\d{4}/g) ?? []).map(Number);
  const start = years[0] ?? 0;
  return [start, years[years.length - 1] ?? start];
}

function topmost(els: HTMLElement[]): HTMLElement | null {
  return els.reduce<HTMLElement | null>((best, el) =>
    !best || el.getBoundingClientRect().top < best.getBoundingClientRect().top ? el : best, null);
}

/** Neueste zuerst: nach Startjahr, bei Gleichstand nach Endjahr. */
function byNewest(a: CvCard, b: CvCard): number {
  const [as, ae] = yearSpan(a.y);
  const [bs, be] = yearSpan(b.y);
  return bs - as || be - ae;
}

@Component({
  selector: 'app-cv-timeline',
  standalone: true,
  imports: [CommonModule, SharedModule, NavbarComponent, FooterComponent],
  templateUrl: './cv-timeline.component.html',
  styleUrls: ['./cv-timeline.component.scss', './cv-timeline.mobile.scss'],
  // Prerendert wird ohne window; Kurve, Reveal und Layout entstehen erst im
  // Browser – Hydration würde an der abweichenden DOM-Struktur scheitern.
  host: { ngSkipHydration: 'true' }
})
export class CvTimelineComponent implements OnInit, AfterViewInit, OnDestroy {

  private router = inject(Router);
  private translate = inject(TranslateService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @ViewChild('wrap') wrap?: ElementRef<HTMLDivElement>;
  @ViewChild('svg') svg?: ElementRef<SVGSVGElement>;
  @ViewChild('spine') spine?: ElementRef<SVGPathElement>;
  @ViewChildren('rowEl') rowEls!: QueryList<ElementRef<HTMLDivElement>>;

  // --- Daten ---------------------------------------------------------------
  rows: CvRow[] = [];
  chips: Chip[] = [];
  summary = cvSummary;
  private byId = new Map<string, CvCard>();
  private skillIndex = new Map<string, string[]>();
  private paraOf = new Map<string, string[]>();

  // --- Zustand -------------------------------------------------------------
  activeCats: CvCategory[] = [];
  activeSkill: string | null = null;
  openId: string | null = null;
  navbarHasBackground = false;
  /** Karten starten unsichtbar und blenden beim Scrollen ein – nur im Browser. */
  revealPending = false;

  // --- Linie ---------------------------------------------------------------
  pathD = '';
  ticks: string[] = [];
  dots: PathPoint[] = [];
  private spineLength = 0;

  private subs = new Subscription();
  private raf = 0;
  private settleTimers: ReturnType<typeof setTimeout>[] = [];
  private resizeTimer: ReturnType<typeof setTimeout> | undefined;
  private observer?: IntersectionObserver;
  private progressTicking = false;

  // Die globale overflow-x:hidden auf html+body macht <body> zum
  // Scroll-Container, 'scroll' kommt nicht zuverlässig am window an.
  private readonly onBodyScroll = (): void => this.queueProgressUpdate();

  ngOnInit(): void {
    this.subs.add(
      this.translate.stream('CV-TIMELINE').subscribe(block => this.build(block))
    );
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
    document.body.addEventListener('scroll', this.onBodyScroll, { passive: true });
    this.scheduleMeasure();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (!this.isBrowser) {
      return;
    }
    document.body.removeEventListener('scroll', this.onBodyScroll);
    cancelAnimationFrame(this.raf);
    clearTimeout(this.resizeTimer);
    this.settleTimers.forEach(clearTimeout);
    this.observer?.disconnect();
  }

  // --- Aufbau des View-Modells ---------------------------------------------

  private build(block: any): void {
    const texts: Record<string, CvStationText> = block?.stations ?? {};
    const catLabels: Record<CvCategory, string> = block?.categories ?? {};
    this.byId.clear();
    this.skillIndex.clear();

    for (const meta of cvStations) {
      const text = texts[meta.id];
      if (!text) {
        continue;
      }
      const card: CvCard = {
        ...text,
        id: meta.id,
        cat: meta.cat,
        color: CV_CATEGORY_COLOR[meta.cat],
        catLabel: catLabels[meta.cat] ?? meta.cat,
      };
      this.byId.set(meta.id, card);
      for (const skill of card.sk ?? []) {
        const list = this.skillIndex.get(skill) ?? [];
        list.push(meta.id);
        this.skillIndex.set(skill, list);
      }
    }

    this.paraOf.clear();
    for (const row of cvRows) {
      const all = [...row.main, ...row.para];
      if (all.length > 1) {
        all.forEach(id => this.paraOf.set(id, all.filter(x => x !== id)));
      }
    }

    // Neueste zuerst
    this.rows = cvRows.slice().reverse().map((row: CvRowMeta) => ({
      yearTop: row.yearTop,
      yearBot: row.yearBot,
      side: row.side,
      markerColor: this.byId.get(row.main[0])?.color ?? CV_CATEGORY_COLOR.ar,
      main: row.main.map(id => this.byId.get(id)!).filter(Boolean),
      para: row.para.map(id => this.byId.get(id)!).filter(Boolean).sort(byNewest),
    }));

    const counts = new Map<CvCategory, number>();
    cvStations.forEach(s => counts.set(s.cat, (counts.get(s.cat) ?? 0) + 1));
    this.chips = [
      { key: null, label: block?.all ?? 'Alle', count: cvStations.length, color: CV_CATEGORY_COLOR.ar },
      ...CV_CATEGORIES.map(k => ({
        key: k, label: catLabels[k] ?? k, count: counts.get(k) ?? 0, color: CV_CATEGORY_COLOR[k]
      })),
    ];

    if (this.activeSkill && !this.skillIndex.has(this.activeSkill)) {
      this.activeSkill = null;
    }
    if (this.isBrowser) {
      this.revealPending = true;
      this.scheduleMeasure();
    }
  }

  // --- Filter --------------------------------------------------------------

  isChipActive(chip: Chip): boolean {
    return chip.key === null ? this.activeCats.length === 0 : this.activeCats.includes(chip.key);
  }

  onChip(chip: Chip): void {
    if (chip.key === null) {
      this.activeCats = [];
      this.activeSkill = null;
      return;
    }
    this.activeCats = this.activeCats.includes(chip.key)
      ? this.activeCats.filter(c => c !== chip.key)
      : [...this.activeCats, chip.key];
  }

  clearSkill(): void {
    this.activeSkill = null;
  }

  selectSkill(skill: string): void {
    this.activeSkill = skill;
    this.activeCats = [];
    this.openId = null;
  }

  get skillCount(): number {
    return this.activeSkill ? (this.skillIndex.get(this.activeSkill)?.length ?? 0) : 0;
  }

  skillUses(skill: string): number {
    return this.skillIndex.get(skill)?.length ?? 0;
  }

  isDim(card: CvCard): boolean {
    if (this.activeSkill) {
      return !card.sk.includes(this.activeSkill);
    }
    return this.activeCats.length > 0 && !this.activeCats.includes(card.cat);
  }

  isHot(card: CvCard): boolean {
    return !!this.activeSkill && card.sk.includes(this.activeSkill);
  }

  // --- Dialog --------------------------------------------------------------

  get open(): CvCard | null {
    return this.openId ? this.byId.get(this.openId) ?? null : null;
  }

  get openParallel(): CvCard[] {
    return (this.paraOf.get(this.openId ?? '') ?? [])
      .map(id => this.byId.get(id)!)
      .filter(Boolean);
  }

  openStation(id: string): void {
    this.openId = id;
  }

  closeDialog(): void {
    this.openId = null;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.openId = null;
  }

  trackById(_: number, card: CvCard): string {
    return card.id;
  }

  toMain(): void {
    this.router.navigate(['/']);
  }

  // --- Linie & Scroll ------------------------------------------------------

  @HostListener('window:resize')
  onResize(): void {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.measure(), 160);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.queueProgressUpdate();
  }

  /** Nach Datenänderung: Karten setzen sich über einige Frames (Fonts,
   *  Reveal-Transition) – deshalb mehrfach nachmessen. */
  private scheduleMeasure(): void {
    this.settleTimers.forEach(clearTimeout);
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      this.setupReveal();
      this.measure();
    });
    this.settleTimers = [160, 600, 1500, 3000].map(ms => setTimeout(() => this.measure(), ms));
  }

  private setupReveal(): void {
    this.observer?.disconnect();
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('app-cv-timeline [data-reveal]'));
    if (!nodes.length) {
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${(i % 3) * 70}ms`;
      io.observe(n);
    });
    this.observer = io;
    // Sicherheitsnetz: alles sichtbar, falls der Observer nicht greift.
    this.settleTimers.push(setTimeout(() => nodes.forEach(n => n.classList.add('is-visible')), 2600));
  }

  private measure(): void {
    const wrap = this.wrap?.nativeElement;
    const svg = this.svg?.nativeElement;
    const rows = this.rowEls?.toArray().map(r => r.nativeElement) ?? [];
    if (!wrap || !svg || !rows.length) {
      return;
    }
    const box = svg.getBoundingClientRect();
    if (!box.width) {
      return;
    }

    // Desktop: Linie in der Mittelrinne des Rasters, kann nie auf einer
    // Karte liegen. Mobile: fest am linken Rand.
    const desktop = window.innerWidth > DESKTOP_BREAKPOINT;
    const x = desktop
      ? Math.round(YEAR_COL + (box.width - YEAR_COL - GUTTER) / 2 + GUTTER / 2)
      : MOBILE_SPINE_X;

    const pts: PathPoint[] = [];
    const ticks: string[] = [];
    rows.forEach(el => {
      // Mobile stehen die Parallelstationen (neuere) per CSS-Grid über der
      // Hauptstation, der Punkt sitzt deshalb an der optisch obersten Karte.
      const card = desktop
        ? el.querySelector<HTMLElement>('[data-main-card]')
        : topmost(Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]')));
      const cr = (card ?? el).getBoundingClientRect();
      const y = Math.round(cr.top - box.top + Math.min(cr.height / 2, 86));
      pts.push({ x, y });
      if (card) {
        const l = cr.left - box.left;
        const r = cr.right - box.left;
        const near = Math.abs(l - x) < Math.abs(r - x) ? l : r;
        const end = near + (near > x ? -7 : 7);
        if (Math.abs(end - x) > 8) {
          ticks.push(`M ${x} ${y} L ${end} ${y}`);
        }
      }
    });

    this.pathD = pts.length ? `M ${x} ${pts[0].y} L ${x} ${pts[pts.length - 1].y}` : '';
    this.ticks = ticks;
    this.dots = pts;

    // Erst nach dem Rendern des neuen d-Attributs die Länge lesen.
    setTimeout(() => {
      const path = this.spine?.nativeElement;
      if (!path) {
        return;
      }
      this.spineLength = path.getTotalLength();
      path.style.strokeDasharray = `${this.spineLength}`;
      this.updateProgress();
    });
  }

  private queueProgressUpdate(): void {
    if (this.progressTicking || !this.isBrowser) {
      return;
    }
    this.progressTicking = true;
    requestAnimationFrame(() => {
      this.updateProgress();
      this.navbarHasBackground = document.body.scrollTop > 10 || window.scrollY > 10;
      this.progressTicking = false;
    });
  }

  /** Die Linie füllt sich mit dem Scrollen: voll, sobald ihr unteres Ende
   *  bei 72 % der Viewport-Höhe angekommen ist. */
  private updateProgress(): void {
    const svg = this.svg?.nativeElement;
    const path = this.spine?.nativeElement;
    if (!svg || !path || !this.spineLength) {
      return;
    }
    const vh = window.innerHeight || 900;
    const box = svg.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (vh * 0.72 - box.top) / Math.max(1, box.height)));
    path.style.strokeDashoffset = `${this.spineLength * (1 - progress)}`;
  }
}
