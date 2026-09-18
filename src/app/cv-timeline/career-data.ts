/**
 * Struktur des Werdegangs. Die Texte liegen in assets/i18n/*.json unter
 * CV-TIMELINE.stations.<id>, hier steht nur, was sprachunabhängig ist:
 * Kategorie, Farbe und die Anordnung in Zeilen mit Haupt- und Parallelstation.
 */

export type CvCategory = 'ar' | 'au' | 'we' | 'en';

export const CV_CATEGORIES: CvCategory[] = ['ar', 'au', 'we', 'en'];

export const CV_CATEGORY_COLOR: Record<CvCategory, string> = {
  ar: '#3DCFB6',
  au: '#5FD0E8',
  we: '#79DF9B',
  en: '#B79FE8',
};

export interface CvStationMeta {
  id: string;
  cat: CvCategory;
}

export const cvStations: CvStationMeta[] = [
  { id: 'mecha', cat: 'au' },
  { id: 'fhr', cat: 'au' },
  { id: 'fokolar', cat: 'en' },
  { id: 'bvg', cat: 'ar' },
  { id: 'ims', cat: 'ar' },
  { id: 'perugia', cat: 'au' },
  { id: 'abi', cat: 'au' },
  { id: 'dgbschul', cat: 'we' },
  { id: 'eosbfd', cat: 'ar' },
  { id: 'eoscert', cat: 'we' },
  { id: 'dgbarbeit', cat: 'ar' },
  { id: 'ba', cat: 'au' },
  { id: 'isag', cat: 'we' },
  { id: 'eosfrei', cat: 'ar' },
  { id: 'casino', cat: 'ar' },
  { id: 'fahrgast', cat: 'ar' },
  { id: 'offenburg', cat: 'ar' },
  { id: 'diakonie', cat: 'ar' },
  { id: 'richiclean', cat: 'ar' },
  { id: 'ordinariat', cat: 'ar' },
  { id: 'kurier', cat: 'ar' },
  { id: 'emmendingen', cat: 'ar' },
  { id: 'hhh', cat: 'ar' },
  { id: 'dasfr', cat: 'we' },
  { id: 'dasma', cat: 'we' },
  { id: 'brand', cat: 'ar' },
  { id: 'umschulung', cat: 'au' },
];

export interface CvRowMeta {
  yearTop: string;
  yearBot: string;
  /** Auf welcher Seite der Linie die Hauptstation liegt. */
  side: 'l' | 'r';
  main: string[];
  para: string[];
}

/** Chronologisch (älteste zuerst); die Seite zeigt sie neueste zuerst. */
export const cvRows: CvRowMeta[] = [
  { yearTop: '2007', yearBot: '– 2011', side: 'l', main: ['mecha'], para: ['fhr', 'fokolar'] },
  { yearTop: '2011', yearBot: '– 2012', side: 'r', main: ['bvg'], para: [] },
  { yearTop: '2012', yearBot: '', side: 'l', main: ['ims'], para: ['perugia'] },
  { yearTop: '2012', yearBot: '– 2013', side: 'r', main: ['abi'], para: [] },
  { yearTop: '2013', yearBot: '– 2014', side: 'l', main: ['eosbfd'], para: ['eoscert', 'dgbschul'] },
  { yearTop: '2013', yearBot: '– 2017', side: 'r', main: ['dgbarbeit'], para: [] },
  { yearTop: '2014', yearBot: '– 2016', side: 'l', main: ['eosfrei'], para: ['casino', 'fahrgast'] },
  { yearTop: '2014', yearBot: '– 2019', side: 'r', main: ['ba'], para: ['isag'] },
  { yearTop: '2016', yearBot: '– 2017', side: 'l', main: ['offenburg'], para: ['diakonie'] },
  { yearTop: '2017', yearBot: '– 2020', side: 'r', main: ['richiclean'], para: ['ordinariat', 'kurier'] },
  { yearTop: '2020', yearBot: '– 2022', side: 'l', main: ['emmendingen'], para: [] },
  { yearTop: '2021', yearBot: '– 2023', side: 'r', main: ['hhh'], para: ['dasfr', 'dasma'] },
  { yearTop: '2023', yearBot: '– 2026', side: 'l', main: ['umschulung'], para: ['brand'] },
];

export interface CvSummaryMeta {
  value: string;
  labelKey: string;
  color: string;
}

export const cvSummary: CvSummaryMeta[] = [
  { value: '27', labelKey: 'stations', color: '#3DCFB6' },
  { value: '14', labelKey: 'parallel', color: '#5FD0E8' },
  { value: '5', labelKey: 'trainings', color: '#79DF9B' },
  { value: '19', labelKey: 'years', color: '#B79FE8' },
];
