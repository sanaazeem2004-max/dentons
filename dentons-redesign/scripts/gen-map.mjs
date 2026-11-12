// Generates a dotted world map + office marker coordinates.
// Offices are taken from https://www.dentons.com/en/global-presence (verified Nov 2026).
import DottedMap from 'dotted-map';
import { writeFileSync } from 'fs';
const offices = [
  // Americas
  ['New York', 'United States', 40.71, -74.0, 'americas'], ['Washington, DC', 'United States', 38.9, -77.04, 'americas'],
  ['Chicago', 'United States', 41.88, -87.63, 'americas'], ['Los Angeles', 'United States', 34.05, -118.24, 'americas'],
  ['San Francisco/Oakland', 'United States', 37.77, -122.42, 'americas'], ['Houston', 'United States', 29.76, -95.37, 'americas'],
  ['Miami', 'United States', 25.76, -80.19, 'americas'], ['Denver', 'United States', 39.74, -104.99, 'americas'],
  ['Toronto', 'Canada', 43.65, -79.38, 'americas'], ['Montréal', 'Canada', 45.5, -73.57, 'americas'],
  ['Calgary', 'Canada', 51.05, -114.07, 'americas'], ['Vancouver', 'Canada', 49.28, -123.12, 'americas'],
  ['Mexico City', 'Mexico', 19.43, -99.13, 'americas'], ['Bogotá', 'Colombia', 4.71, -74.07, 'americas'],
  ['Lima', 'Peru', -12.05, -77.04, 'americas'], ['Santiago', 'Chile', -33.45, -70.67, 'americas'],
  ['Buenos Aires', 'Argentina', -34.6, -58.38, 'americas'], ['São Paulo', 'Brazil', -23.55, -46.63, 'americas'],
  ['Panama City', 'Panama', 8.98, -79.52, 'americas'], ['Quito', 'Ecuador', -0.18, -78.47, 'americas'],
  // Europe & Central Asia
  ['London', 'United Kingdom', 51.51, -0.13, 'europe'], ['Edinburgh', 'United Kingdom', 55.95, -3.19, 'europe'],
  ['Dublin', 'Ireland', 53.35, -6.26, 'europe'], ['Paris', 'France', 48.86, 2.35, 'europe'],
  ['Brussels', 'Belgium', 50.85, 4.35, 'europe'], ['Amsterdam', 'Netherlands', 52.37, 4.9, 'europe'],
  ['Berlin', 'Germany', 52.52, 13.4, 'europe'], ['Frankfurt', 'Germany', 50.11, 8.68, 'europe'],
  ['Munich', 'Germany', 48.14, 11.58, 'europe'], ['Madrid', 'Spain', 40.42, -3.7, 'europe'],
  ['Milan', 'Italy', 45.46, 9.19, 'europe'], ['Rome', 'Italy', 41.9, 12.5, 'europe'],
  ['Warsaw', 'Poland', 52.23, 21.01, 'europe'], ['Prague', 'Czech Republic', 50.08, 14.44, 'europe'],
  ['Budapest', 'Hungary', 47.5, 19.04, 'europe'], ['Bucharest', 'Romania', 44.43, 26.1, 'europe'],
  ['Bratislava', 'Slovak Republic', 48.15, 17.11, 'europe'], ['Kyiv', 'Ukraine', 50.45, 30.52, 'europe'],
  ['Istanbul', 'Türkiye', 41.01, 28.98, 'europe'], ['Luxembourg', 'Luxembourg', 49.61, 6.13, 'europe'],
  ['Tbilisi', 'Georgia', 41.72, 44.78, 'europe'], ['Baku', 'Azerbaijan', 40.41, 49.87, 'europe'],
  ['Almaty', 'Kazakhstan', 43.24, 76.89, 'europe'], ['Tashkent', 'Uzbekistan', 41.3, 69.24, 'europe'],
  // Middle East & Africa
  ['Dubai', 'United Arab Emirates', 25.2, 55.27, 'mea'], ['Abu Dhabi', 'United Arab Emirates', 24.45, 54.38, 'mea'],
  ['Riyadh', 'Saudi Arabia', 24.71, 46.68, 'mea'], ['Doha', 'Qatar', 25.29, 51.53, 'mea'],
  ['Muscat', 'Oman', 23.59, 58.41, 'mea'], ['Beirut', 'Lebanon', 33.89, 35.5, 'mea'],
  ['Cairo', 'Egypt', 30.04, 31.24, 'mea'], ['Casablanca', 'Morocco', 33.57, -7.59, 'mea'],
  ['Tunis', 'Tunisia', 36.81, 10.18, 'mea'], ['Dakar', 'Senegal', 14.72, -17.47, 'mea'],
  ['Lagos', 'Nigeria', 6.52, 3.38, 'mea'], ['Douala', 'Cameroon', 4.05, 9.77, 'mea'],
  ['Kinshasa', 'Democratic Republic of the Congo', -4.44, 15.27, 'mea'], ['Addis Ababa', 'Ethiopia', 9.03, 38.74, 'mea'],
  ['Nairobi', 'Kenya', -1.29, 36.82, 'mea'], ['Kampala', 'Uganda', 0.35, 32.58, 'mea'],
  ['Dar es Salaam', 'Tanzania', -6.79, 39.21, 'mea'], ['Lusaka', 'Zambia', -15.39, 28.32, 'mea'],
  ['Maputo', 'Mozambique', -25.97, 32.57, 'mea'], ['Windhoek', 'Namibia', -22.56, 17.08, 'mea'],
  ['Johannesburg', 'South Africa', -26.2, 28.05, 'mea'], ['Cape Town', 'South Africa', -33.92, 18.42, 'mea'],
  ['Port Louis', 'Mauritius', -20.16, 57.5, 'mea'],
  // Asia Pacific
  ['Mumbai', 'India', 19.08, 72.88, 'apac'], ['New Delhi', 'India', 28.61, 77.21, 'apac'],
  ['Bengaluru', 'India', 12.97, 77.59, 'apac'], ['Singapore', 'Singapore', 1.35, 103.82, 'apac'],
  ['Kuala Lumpur', 'Malaysia', 3.14, 101.69, 'apac'], ['Jakarta', 'Indonesia', -6.2, 106.85, 'apac'],
  ['Bangkok', 'Thailand', 13.76, 100.5, 'apac'], ['Yangon', 'Myanmar', 16.87, 96.2, 'apac'],
  ['Hanoi', 'Vietnam', 21.03, 105.85, 'apac'], ['Ho Chi Minh City', 'Vietnam', 10.82, 106.63, 'apac'],
  ['Manila', 'Philippines', 14.6, 120.98, 'apac'], ['Hong Kong', 'China', 22.32, 114.17, 'apac'],
  ['Seoul', 'South Korea', 37.57, 126.98, 'apac'], ['Sydney', 'Australia', -33.87, 151.21, 'apac'],
  ['Melbourne', 'Australia', -37.81, 144.96, 'apac'], ['Brisbane', 'Australia', -27.47, 153.03, 'apac'],
  ['Perth', 'Australia', -31.95, 115.86, 'apac'], ['Auckland', 'New Zealand', -36.85, 174.76, 'apac'],
  ['Wellington', 'New Zealand', -41.29, 174.78, 'apac'], ['Port Moresby', 'Papua New Guinea', -9.44, 147.18, 'apac'],
];
const map = new DottedMap({ height: 70, grid: 'diagonal' });
const { width, height } = map.image;
const dots = map.getPoints().map(p => [+p.x.toFixed(2), +p.y.toFixed(2)]);
const pins = offices.map(([city, country, lat, lng, region]) => {
  const pin = map.getPin({ lat, lng });
  return { city, country, region, x: +pin.x.toFixed(2), y: +pin.y.toFixed(2) };
});
writeFileSync('src/data/worldMap.json', JSON.stringify({ width, height, dots, pins }));
console.log(width, height, dots.length, pins.length);
