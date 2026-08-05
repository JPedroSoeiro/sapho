import { HelicopterPart } from '@/types/part';
import { AIRCRAFT_COMPONENTS } from './realAircraftComponents';

// Map aircraft IDs to their component types
const AIRCRAFT_MODEL_MAP: Record<string, keyof typeof AIRCRAFT_COMPONENTS> = {
  'ac-001': 'AS350-B2', // PT-HBM
  'ac-002': 'AS350-B2', // PT-HBN
  'ac-003': 'EC130-B4', // PT-HBO
  'ac-004': 'EC135-P2+', // PT-HBP
  'ac-005': 'H135',     // PT-HBQ
  'ac-006': 'H135',     // PT-HBR
  'ac-007': 'EC145-C2', // PT-HBS
  'ac-008': 'EC145-C2', // PT-HBT
  'ac-009': 'EC145-C2', // PT-HBU
};

// Generate parts from real aircraft components
function generatePartsFromComponents(): HelicopterPart[] {
  const parts: HelicopterPart[] = [];
  let partCounter = 1;

  for (const [aircraftId, modelKey] of Object.entries(AIRCRAFT_MODEL_MAP)) {
    const model = AIRCRAFT_COMPONENTS[modelKey];

    model.components.forEach((component, index) => {
      const partId = `part-${aircraftId.substring(3)}-${String(index + 1).padStart(3, '0')}`;

      // Generate realistic install dates (between 6 months and 4 years ago)
      const daysAgo = Math.floor(Math.random() * (4 * 365 - 180) + 180);
      const installDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      // Generate flight hours based on component TBO usage
      const maxUsagePercent = Math.random() * 0.95; // 0-95% usage
      const currentFlightHours = Math.floor(component.tbo * maxUsagePercent);

      // Determine status based on usage
      let status: 'OK' | 'WARNING' | 'CRITICAL_AOG' = 'OK';
      const usagePercent = (currentFlightHours / component.tbo) * 100;

      if (usagePercent > 100) {
        status = 'CRITICAL_AOG';
      } else if (usagePercent > 80) {
        status = 'WARNING';
      }

      const part: HelicopterPart = {
        id: partId,
        name: component.name,
        serialNumber: `${component.name.substring(0, 3).toUpperCase()}-${aircraftId.substring(3).toUpperCase()}-${String(partCounter).padStart(4, '0')}`,
        aircraftId,
        category: component.category,
        installDate,
        maxLifespanDays: component.maxDays,
        currentFlightHours,
        maxFlightHoursTBO: component.tbo,
        status,
        createdAt: installDate,
        updatedAt: new Date(),
        notes: `${model.model} - ${component.category}`,
      };

      parts.push(part);
      partCounter++;
    });
  }

  return parts;
}

export const INITIAL_PARTS_MOCK: HelicopterPart[] = generatePartsFromComponents();
