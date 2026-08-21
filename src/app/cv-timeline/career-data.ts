export type CvCategory = 'ausbildung' | 'beruf' | 'studium' | 'weiterbildung';

export interface CvStationMeta {
  key: string;
  kategorie: CvCategory;
}

export const cvStations: CvStationMeta[] = [
  { key: 'station-1', kategorie: 'ausbildung' },
  { key: 'station-2', kategorie: 'ausbildung' },
  { key: 'station-3', kategorie: 'beruf' },
  { key: 'station-4', kategorie: 'studium' },
  { key: 'station-5', kategorie: 'beruf' },
  { key: 'station-6', kategorie: 'beruf' },
  { key: 'station-7', kategorie: 'weiterbildung' },
  { key: 'station-8', kategorie: 'ausbildung' },
];
