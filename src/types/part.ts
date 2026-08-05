export type PartStatus = 'OK' | 'WARNING' | 'CRITICAL_AOG';

export interface MaintenanceHistory {
  id: string;
  date: Date;
  type: 'replacement' | 'maintenance' | 'inspection';
  description: string;
  technician: string;
}

export interface HelicopterPart {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  aircraftId: string; // Referência ao helicóptero
  installDate: Date;
  maxLifespanDays: number;
  currentFlightHours: number;
  maxFlightHoursTBO: number;
  status: PartStatus;
  createdAt: Date;
  updatedAt: Date;
  maintenanceHistory?: MaintenanceHistory[];
  notes?: string;
}

export interface PartWithCalculatedLifespan extends HelicopterPart {
  daysUsed: number;
  daysRemaining: number;
  hoursRemaining: number;
  calendarPercentage: number;
  hoursPercentage: number;
  criticalityLevel: 'healthy' | 'alert' | 'critical';
}
