import type { Neighborhood, DemographicData, CityAverage } from '../types';

export async function loadNeighborhoods(): Promise<Neighborhood[]> {
  const response = await fetch('/data/neighborhoods.json');
  if (!response.ok) {
    throw new Error('Failed to load neighborhoods data');
  }
  return response.json();
}

export async function loadDemographicData(): Promise<DemographicData[]> {
  const response = await fetch('/data/demographic-data.json');
  if (!response.ok) {
    throw new Error('Failed to load demographic data');
  }
  return response.json();
}

export function calculateCityAverage(neighborhoods: Neighborhood[]): CityAverage {
  const total = neighborhoods.length;

  return {
    lifeExpectancy: neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / total,
    hoiScore: neighborhoods.reduce((sum, n) => sum + n.sdohScores.hoiScore, 0) / total,
    povertyRate: neighborhoods.reduce((sum, n) => sum + n.sdohScores.povertyRate, 0) / total,
    unemploymentRate: neighborhoods.reduce((sum, n) => sum + n.sdohScores.unemploymentRate, 0) / total,
    housingCostBurden: neighborhoods.reduce((sum, n) => sum + n.sdohScores.housingCostBurden, 0) / total,
    hsGraduationRate: neighborhoods.reduce((sum, n) => sum + n.sdohScores.hsGraduationRate, 0) / total,
    primaryCareAccess: neighborhoods.reduce((sum, n) => sum + n.sdohScores.primaryCareAccess, 0) / total,
  };
}

export function getNeighborhoodById(neighborhoods: Neighborhood[], id: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.id === id);
}

export function searchNeighborhoods(neighborhoods: Neighborhood[], query: string): Neighborhood[] {
  const lowerQuery = query.toLowerCase();
  return neighborhoods.filter(n =>
    n.name.toLowerCase().includes(lowerQuery) ||
    n.zipCode.includes(query) ||
    n.id.toLowerCase().includes(lowerQuery)
  );
}

export function sortNeighborhoodsByMetric(
  neighborhoods: Neighborhood[],
  metric: 'lifeExpectancy' | 'hoiScore',
  order: 'asc' | 'desc' = 'desc'
): Neighborhood[] {
  const sorted = [...neighborhoods].sort((a, b) => {
    const aValue = metric === 'lifeExpectancy'
      ? a.healthMetrics.lifeExpectancy
      : a.sdohScores.hoiScore;
    const bValue = metric === 'lifeExpectancy'
      ? b.healthMetrics.lifeExpectancy
      : b.sdohScores.hoiScore;

    return order === 'desc' ? bValue - aValue : aValue - bValue;
  });

  return sorted;
}
