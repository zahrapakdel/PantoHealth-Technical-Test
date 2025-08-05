
export interface ChartData {
  title: string;
  data: [number, number | number[] | null][];
}

export type SingleSeriesData = [number, number | null][];
export type MultiSeriesData = [number, number[] | null][];

export function isSingleSeries(data: ChartData['data']): data is SingleSeriesData {
  return data.some(([, value]) => value !== null && typeof value === 'number');
}

export function isMultiSeries(data: ChartData['data']): data is MultiSeriesData {
  return data.some(([, value]) => value !== null && Array.isArray(value));
}