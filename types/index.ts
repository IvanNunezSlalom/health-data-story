export interface Neighborhood {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  geometry?: GeoJSON.Geometry;
  population: number;
  zipCode: string;
  predominantRaceEthnicity: string;
  medianIncomeBracket: string;
  healthMetrics: HealthMetrics;
  sdohScores: SDOHScores;
}

export interface HealthMetrics {
  lifeExpectancy: number;
  prematureMortalityRate: number;
  infantMortalityRate: number;
  diabetesPrevalence: number;
  asthmaEDRate: number;
}

export interface SDOHScores {
  hoiScore: number;
  hoiCategory: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  povertyRate: number;
  unemploymentRate: number;
  housingCostBurden: number;
  hsGraduationRate: number;
  primaryCareAccess: number;
  housingScore: number;
  educationScore: number;
  employmentScore: number;
  environmentScore: number;
  healthcareScore: number;
}

export interface DemographicData {
  demographicGroup: string;
  groupType: 'race_ethnicity' | 'income_quintile';
  lifeExpectancy: number;
  prematureMortalityRate: number;
}

export interface CityAverage {
  lifeExpectancy: number;
  hoiScore: number;
  povertyRate: number;
  unemploymentRate: number;
  housingCostBurden: number;
  hsGraduationRate: number;
  primaryCareAccess: number;
}
