import { Alert, Device, MapNode, Sensor, SensorReading, User, WaterUsage, DashboardStats } from '../types';

// Generate a random value within a range
const randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate timestamps for the past hours/days
const getTimestamp = (hoursAgo: number) => Date.now() - hoursAgo * 60 * 60 * 1000;

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Mohale User',
    email: 'mohale@watermonitor.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Selimo User',
    email: 'selimo@watermonitor.com',
    role: 'user',
  },
  {
    id: '3',
    name: 'Thebe Support',
    email: 'thebe@watermonitor.com',
    role: 'technician',
  },
];

// Mock Sensors
export const mockSensors: Sensor[] = [
  {
    id: 's1',
    name: 'Main Flow Meter',
    type: 'flow',
    location: 'Main Pipe Entry',
    status: 'online',
    batteryLevel: 85,
  },
  {
    id: 's2',
    name: 'Pressure Sensor 1',
    type: 'pressure',
    location: 'Distribution Junction',
    status: 'online',
    batteryLevel: 92,
  },
  {
    id: 's3',
    name: 'Garden Soil Sensor',
    type: 'soilMoisture',
    location: 'North Garden',
    status: 'online',
    batteryLevel: 78,
  },
  {
    id: 's4',
    name: 'Tank Level Sensor',
    type: 'waterLevel',
    location: 'Main Storage Tank',
    status: 'warning',
    batteryLevel: 45,
  },
  {
    id: 's5',
    name: 'Environment Monitor',
    type: 'temperatureHumidity',
    location: 'Control Room',
    status: 'online',
    batteryLevel: 88,
  },
  {
    id: 's6',
    name: 'Rain Gauge',
    type: 'rainfall',
    location: 'Rooftop',
    status: 'offline',
    batteryLevel: 12,
  },
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'd1',
    name: 'Main Pump',
    type: 'pump',
    status: 'on',
    automatic: true,
    location: 'Utility Room',
  },
  {
    id: 'd2',
    name: 'Garden Valve',
    type: 'valve',
    status: 'off',
    automatic: true,
    location: 'North Garden',
  },
  {
    id: 'd3',
    name: 'Sprinkler System',
    type: 'irrigator',
    status: 'off',
    automatic: true,
    location: 'West Lawn',
  },
  {
    id: 'd4',
    name: 'Water Filter',
    type: 'filter',
    status: 'on',
    automatic: true,
    location: 'Main Line',
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'leak',
    severity: 'critical',
    message: 'Possible leak detected near kitchen line',
    timestamp: getTimestamp(1),
    sensorId: 's1',
    acknowledged: false,
  },
  {
    id: 'a2',
    type: 'pressure',
    severity: 'warning',
    message: 'Abnormal pressure fluctuation in main line',
    timestamp: getTimestamp(3),
    sensorId: 's2',
    acknowledged: true,
  },
  {
    id: 'a3',
    type: 'moisture',
    severity: 'info',
    message: 'Garden soil moisture below optimal levels',
    timestamp: getTimestamp(8),
    sensorId: 's3',
    acknowledged: false,
  },
  {
    id: 'a4',
    type: 'level',
    severity: 'warning',
    message: 'Water tank level dropping faster than expected',
    timestamp: getTimestamp(12),
    sensorId: 's4',
    acknowledged: false,
  },
  {
    id: 'a5',
    type: 'system',
    severity: 'info',
    message: 'System update completed successfully',
    timestamp: getTimestamp(24),
    acknowledged: true,
  },
];

// Mock Sensor Readings (past 24 hours)
export const generateMockReadings = (sensorId: string, type: string, count = 24): SensorReading[] => {
  const readings: SensorReading[] = [];
  let unit = '';
  let minVal = 0;
  let maxVal = 100;
  
  switch (type) {
    case 'flow':
      unit = 'L/min';
      minVal = 15;
      maxVal = 25;
      break;
    case 'pressure':
      unit = 'psi';
      minVal = 45;
      maxVal = 55;
      break;
    case 'soilMoisture':
      unit = '%';
      minVal = 20;
      maxVal = 40;
      break;
    case 'waterLevel':
      unit = '%';
      minVal = 60;
      maxVal = 90;
      break;
    case 'temperatureHumidity':
      unit = '°C';
      minVal = 18;
      maxVal = 26;
      break;
    case 'rainfall':
      unit = 'mm';
      minVal = 0;
      maxVal = 5;
      break;
    default:
      unit = 'units';
  }

  for (let i = 0; i < count; i++) {
    readings.push({
      id: `${sensorId}-${i}`,
      sensorId,
      timestamp: getTimestamp(count - i),
      value: randomValue(minVal, maxVal),
      unit,
    });
  }

  return readings;
};

// Mock Water Usage Data
export const generateWaterUsageData = (days = 30): WaterUsage[] => {
  const usage: WaterUsage[] = [];
  
  for (let i = 0; i < days; i++) {
    usage.push({
      id: `u${i}`,
      timestamp: getTimestamp(days - i),
      volume: randomValue(200, 350),
      location: 'Main House',
      purpose: i % 2 === 0 ? 'Domestic' : 'Irrigation',
    });
  }
  
  return usage;
};

// Mock Map Data
export const mockMapNodes: MapNode[] = [
  {
    id: 'n1',
    type: 'junction',
    x: 120,
    y: 100,
    status: 'normal',
    linkedTo: ['n2', 'n3'],
  },
  {
    id: 'n2',
    type: 'sensor',
    x: 220,
    y: 100,
    status: 'normal',
    linkedTo: ['n3', 'n4'],
    data: mockSensors[0],
  },
  {
    id: 'n3',
    type: 'device',
    x: 170,
    y: 180,
    status: 'normal',
    linkedTo: ['n5'],
    data: mockDevices[0],
  },
  {
    id: 'n4',
    type: 'sensor',
    x: 320,
    y: 100,
    status: 'warning',
    linkedTo: ['n6'],
    data: mockSensors[1],
  },
  {
    id: 'n5',
    type: 'sensor',
    x: 170,
    y: 260,
    status: 'normal',
    linkedTo: [],
    data: mockSensors[2],
  },
  {
    id: 'n6',
    type: 'tank',
    x: 420,
    y: 100,
    status: 'warning',
    linkedTo: [],
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalWaterUsage: 3250,
  activeAlerts: 3,
  leakProbability: 22,
  savingsPercentage: 15,
  healthScore: 85,
};

// Function to get sensor readings for a specific sensor
export const getMockSensorReadings = (sensorId: string): SensorReading[] => {
  const sensor = mockSensors.find(s => s.id === sensorId);
  if (!sensor) return [];
  return generateMockReadings(sensorId, sensor.type);
};

// Function to get water usage trend data
export const getWaterUsageTrend = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const thisWeek = Array.from({ length: 7 }, () => randomValue(220, 320));
  const lastWeek = Array.from({ length: 7 }, () => randomValue(240, 350));
  
  return {
    labels: days,
    datasets: [
      {
        label: 'This Week',
        data: thisWeek,
        borderColor: '#0891B2',
        backgroundColor: 'rgba(8, 145, 178, 0.1)',
      },
      {
        label: 'Last Week',
        data: lastWeek,
        borderColor: '#94A3B8',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
      },
    ],
  };
};

// Function to initialize sensor with most recent reading
export function enrichSensorsWithReadings(): Sensor[] {
  return mockSensors.map(sensor => {
    const readings = getMockSensorReadings(sensor.id);
    const lastReading = readings.length > 0 ? readings[readings.length - 1] : undefined;
    return { ...sensor, lastReading };
  });
}