import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Neighborhood, DemographicData } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const NUM_NEIGHBORHOODS = 25;
const CITY_CENTER = { lat: 40.7128, lon: -74.0060 }; // Example: NYC-like coordinates
const RADIUS = 0.15; // Degrees (~10 miles)

// Helper functions
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function normalDistribution(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getHOICategory(score: number): 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High' {
  if (score < 20) return 'Very Low';
  if (score < 40) return 'Low';
  if (score < 60) return 'Moderate';
  if (score < 80) return 'High';
  return 'Very High';
}

// Generate geographic clusters
const clusters = [
  { name: 'Downtown', center: { lat: CITY_CENTER.lat, lon: CITY_CENTER.lon }, avgHOI: 35, avgLE: 74 },
  { name: 'North', center: { lat: CITY_CENTER.lat + 0.08, lon: CITY_CENTER.lon + 0.02 }, avgHOI: 70, avgLE: 81 },
  { name: 'South', center: { lat: CITY_CENTER.lat - 0.06, lon: CITY_CENTER.lon - 0.03 }, avgHOI: 45, avgLE: 76 },
  { name: 'West', center: { lat: CITY_CENTER.lat + 0.02, lon: CITY_CENTER.lon - 0.08 }, avgHOI: 60, avgLE: 79 },
];

const neighborhoodNames = [
  'Downtown Core', 'Riverside', 'Hillside', 'Northgate', 'Parkview',
  'Eastbrook', 'Westfield', 'Southside', 'Midtown', 'Lakefront',
  'Oak Park', 'Maple Heights', 'Cedar Grove', 'Pine Valley', 'Willow Creek',
  'Sunset District', 'Harbor View', 'University District', 'Old Town', 'Green Meadows',
  'Highland Park', 'Bayshore', 'Valley View', 'Mission District', 'Lincoln Heights'
];

const raceEthnicityGroups = [
  'White', 'White', 'White',
  'Black/African American', 'Black/African American', 'Black/African American',
  'Hispanic/Latino', 'Hispanic/Latino',
  'Asian', 'Asian',
  'Multiracial/Other', 'Multiracial/Other'
];

const incomeBrackets = [
  'Under $25k', '$25k-$50k', '$50k-$75k', '$75k-$100k', 'Over $100k'
];

// Generate neighborhoods
function generateNeighborhoods(): Neighborhood[] {
  const neighborhoods: Neighborhood[] = [];

  for (let i = 0; i < NUM_NEIGHBORHOODS; i++) {
    const cluster = clusters[i % clusters.length];
    const name = neighborhoodNames[i];

    // Generate coordinates within cluster
    const lat = cluster.center.lat + randomInRange(-0.03, 0.03);
    const lon = cluster.center.lon + randomInRange(-0.03, 0.03);

    // Generate HOI score with cluster influence and some randomness
    const hoiBase = normalDistribution(cluster.avgHOI, 15);
    const hoiScore = clamp(hoiBase, 15, 90);

    // Generate life expectancy correlated with HOI (r ≈ 0.7)
    const leCorrelated = 72 + (hoiScore / 100) * 12; // Base correlation
    const leNoise = normalDistribution(0, 2); // Add noise
    const lifeExpectancy = clamp(leCorrelated + leNoise, 72, 84);

    // Generate component scores that sum to HOI
    const componentBase = hoiScore / 5;
    const housingScore = clamp(componentBase + randomInRange(-15, 15), 0, 100);
    const educationScore = clamp(componentBase + randomInRange(-15, 15), 0, 100);
    const employmentScore = clamp(componentBase + randomInRange(-15, 15), 0, 100);
    const environmentScore = clamp(componentBase + randomInRange(-15, 15), 0, 100);
    const healthcareScore = clamp(componentBase + randomInRange(-15, 15), 0, 100);

    // Generate SDOH indicators
    const povertyRate = clamp(45 - (hoiScore / 100) * 40, 5, 45);
    const unemploymentRate = clamp(15 - (hoiScore / 100) * 12, 3, 15);
    const housingCostBurden = clamp(20 + (hoiScore / 100) * 30, 20, 55);
    const hsGraduationRate = clamp(65 + (hoiScore / 100) * 30, 65, 95);
    const primaryCareAccess = clamp(5 + (hoiScore / 100) * 20, 5, 25);

    // Generate health metrics
    const prematureMortalityRate = clamp(normalDistribution(400 - (lifeExpectancy - 72) * 30, 50), 200, 600);
    const infantMortalityRate = clamp(normalDistribution(8 - (lifeExpectancy - 72) * 0.5, 2), 3, 12);
    const diabetesPrevalence = clamp(normalDistribution(14 - (hoiScore / 100) * 6, 2), 6, 18);
    const asthmaEDRate = clamp(normalDistribution(150 - (hoiScore / 100) * 80, 30), 40, 200);

    const neighborhood: Neighborhood = {
      id: `tract-${String(i + 1).padStart(3, '0')}`,
      name,
      coordinates: { lat, lon },
      population: Math.floor(randomInRange(5000, 35000)),
      zipCode: `100${String(i + 10).padStart(2, '0')}`,
      predominantRaceEthnicity: raceEthnicityGroups[Math.floor(Math.random() * raceEthnicityGroups.length)],
      medianIncomeBracket: incomeBrackets[Math.floor(hoiScore / 20)],
      healthMetrics: {
        lifeExpectancy: Math.round(lifeExpectancy * 10) / 10,
        prematureMortalityRate: Math.round(prematureMortalityRate),
        infantMortalityRate: Math.round(infantMortalityRate * 10) / 10,
        diabetesPrevalence: Math.round(diabetesPrevalence * 10) / 10,
        asthmaEDRate: Math.round(asthmaEDRate),
      },
      sdohScores: {
        hoiScore: Math.round(hoiScore),
        hoiCategory: getHOICategory(hoiScore),
        povertyRate: Math.round(povertyRate * 10) / 10,
        unemploymentRate: Math.round(unemploymentRate * 10) / 10,
        housingCostBurden: Math.round(housingCostBurden * 10) / 10,
        hsGraduationRate: Math.round(hsGraduationRate * 10) / 10,
        primaryCareAccess: Math.round(primaryCareAccess * 10) / 10,
        housingScore: Math.round(housingScore),
        educationScore: Math.round(educationScore),
        employmentScore: Math.round(employmentScore),
        environmentScore: Math.round(environmentScore),
        healthcareScore: Math.round(healthcareScore),
      },
    };

    neighborhoods.push(neighborhood);
  }

  return neighborhoods;
}

// Generate demographic data
function generateDemographicData(): DemographicData[] {
  const demographicData: DemographicData[] = [
    // Race/Ethnicity groups
    { demographicGroup: 'White', groupType: 'race_ethnicity', lifeExpectancy: 81.2, prematureMortalityRate: 280 },
    { demographicGroup: 'Asian', groupType: 'race_ethnicity', lifeExpectancy: 83.5, prematureMortalityRate: 220 },
    { demographicGroup: 'Hispanic/Latino', groupType: 'race_ethnicity', lifeExpectancy: 78.8, prematureMortalityRate: 340 },
    { demographicGroup: 'Black/African American', groupType: 'race_ethnicity', lifeExpectancy: 73.4, prematureMortalityRate: 520 },
    { demographicGroup: 'American Indian/Alaska Native', groupType: 'race_ethnicity', lifeExpectancy: 71.8, prematureMortalityRate: 580 },
    { demographicGroup: 'Multiracial/Other', groupType: 'race_ethnicity', lifeExpectancy: 77.5, prematureMortalityRate: 380 },

    // Income quintiles
    { demographicGroup: 'Quintile 1 (Lowest)', groupType: 'income_quintile', lifeExpectancy: 72.5, prematureMortalityRate: 550 },
    { demographicGroup: 'Quintile 2', groupType: 'income_quintile', lifeExpectancy: 75.8, prematureMortalityRate: 450 },
    { demographicGroup: 'Quintile 3', groupType: 'income_quintile', lifeExpectancy: 78.2, prematureMortalityRate: 360 },
    { demographicGroup: 'Quintile 4', groupType: 'income_quintile', lifeExpectancy: 80.5, prematureMortalityRate: 290 },
    { demographicGroup: 'Quintile 5 (Highest)', groupType: 'income_quintile', lifeExpectancy: 83.1, prematureMortalityRate: 210 },
  ];

  return demographicData;
}

// Generate and save data
function main() {
  const neighborhoods = generateNeighborhoods();
  const demographicData = generateDemographicData();

  const outputDir = path.join(__dirname, '..', 'public', 'data');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write neighborhoods data
  fs.writeFileSync(
    path.join(outputDir, 'neighborhoods.json'),
    JSON.stringify(neighborhoods, null, 2)
  );

  // Write demographic data
  fs.writeFileSync(
    path.join(outputDir, 'demographic-data.json'),
    JSON.stringify(demographicData, null, 2)
  );

  // Calculate and log statistics
  const avgLE = neighborhoods.reduce((sum, n) => sum + n.healthMetrics.lifeExpectancy, 0) / neighborhoods.length;
  const avgHOI = neighborhoods.reduce((sum, n) => sum + n.sdohScores.hoiScore, 0) / neighborhoods.length;

  // Calculate correlation
  const leValues = neighborhoods.map(n => n.healthMetrics.lifeExpectancy);
  const hoiValues = neighborhoods.map(n => n.sdohScores.hoiScore);
  const correlation = calculateCorrelation(leValues, hoiValues);

  console.log('✅ Data generation complete!');
  console.log(`   ${neighborhoods.length} neighborhoods created`);
  console.log(`   Average Life Expectancy: ${avgLE.toFixed(1)} years`);
  console.log(`   Average HOI Score: ${avgHOI.toFixed(1)}`);
  console.log(`   Correlation (HOI vs LE): ${correlation.toFixed(3)}`);
  console.log(`   Range: LE ${Math.min(...leValues).toFixed(1)}-${Math.max(...leValues).toFixed(1)} years`);
  console.log(`   Range: HOI ${Math.min(...hoiValues)}-${Math.max(...hoiValues)}`);
}

function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return numerator / denominator;
}

main();
