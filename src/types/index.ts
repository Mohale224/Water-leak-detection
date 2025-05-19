// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'technician';
}

export interface SensorReading {
  id: string;
  sensorId: string;
  timestamp: number;
  value: number;
  unit: string;
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  lastReading?: SensorReading;
  batteryLevel?: number;
}

export type SensorType = 
  | 'flow' 
  | 'pressure' 
  | 'soilMoisture' 
  | 'waterLevel' 
  | 'temperatureHumidity' 
  | 'rainfall' 
  | 'gas';

export interface Alert {
  id: string;
  type: 'leak' | 'pressure' | 'level' | 'moisture' | 'system' | 'weather';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
  sensorId?: string;
  acknowledged: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: 'pump' | 'valve' | 'irrigator' | 'filter';
  status: 'on' | 'off' | 'error';
  automatic: boolean;
  location: string;
}

export interface WaterUsage {
  id: string;
  timestamp: number;
  volume: number;
  location: string;
  purpose?: string;
}

export interface MapNode {
  id: string;
  type: 'sensor' | 'device' | 'junction' | 'tank';
  x: number;
  y: number;
  status?: 'normal' | 'warning' | 'error';
  linkedTo: string[];
  data?: Sensor | Device;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export interface DashboardStats {
  totalWaterUsage: number;
  activeAlerts: number;
  leakProbability: number;
  savingsPercentage: number;
  healthScore: number;
}