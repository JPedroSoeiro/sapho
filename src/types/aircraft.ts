export interface Aircraft {
  id: string;
  name: string;
  registration: string; // Matrícula/Prefixo (ex: PT-XYZ)
  model: string; // Modelo do helicóptero
  manufacturingYear: number;
  operationalStatus: 'active' | 'maintenance' | 'grounded';
  totalFlightHours: number;
  lastMaintenanceDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
