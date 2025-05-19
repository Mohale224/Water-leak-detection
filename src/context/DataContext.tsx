import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Alert, 
  Device, 
  Sensor, 
  SensorReading, 
  MapNode,
  DashboardStats,
  WaterUsage
} from '../types';
import { 
  mockAlerts, 
  mockDevices, 
  getWaterUsageTrend, 
  mockMapNodes, 
  mockDashboardStats,
  enrichSensorsWithReadings,
  generateMockReadings,
  generateWaterUsageData
} from '../utils/mockData';

interface DataContextType {
  sensors: Sensor[];
  devices: Device[];
  alerts: Alert[];
  mapNodes: MapNode[];
  dashboardStats: DashboardStats;
  getSensorReadings: (sensorId: string) => SensorReading[];
  getWaterUsage: () => WaterUsage[];
  getWaterUsageChart: () => any;
  toggleDeviceStatus: (deviceId: string) => void;
  toggleDeviceAutomatic: (deviceId: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [mapNodes, setMapNodes] = useState<MapNode[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(mockDashboardStats);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    // Simulate loading data from API
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSensors(enrichSensorsWithReadings());
      setDevices(mockDevices);
      setAlerts(mockAlerts);
      setMapNodes(mockMapNodes);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Get sensor readings
  const getSensorReadings = (sensorId: string): SensorReading[] => {
    const sensor = sensors.find(s => s.id === sensorId);
    if (!sensor) return [];
    return generateMockReadings(sensorId, sensor.type);
  };

  // Get water usage data
  const getWaterUsage = (): WaterUsage[] => {
    return generateWaterUsageData();
  };

  // Get water usage chart data
  const getWaterUsageChart = () => {
    return getWaterUsageTrend();
  };

  // Toggle device status
  const toggleDeviceStatus = (deviceId: string) => {
    setDevices(prevDevices => {
      return prevDevices.map(device => {
        if (device.id === deviceId) {
          return {
            ...device,
            status: device.status === 'on' ? 'off' : 'on'
          };
        }
        return device;
      });
    });

    // Update map nodes that represent devices
    setMapNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.type === 'device' && node.data && 'id' in node.data && node.data.id === deviceId) {
          const updatedDevice = devices.find(d => d.id === deviceId);
          if (updatedDevice) {
            return {
              ...node,
              data: updatedDevice
            };
          }
        }
        return node;
      });
    });
  };

  // Toggle device automatic mode
  const toggleDeviceAutomatic = (deviceId: string) => {
    setDevices(prevDevices => {
      return prevDevices.map(device => {
        if (device.id === deviceId) {
          return {
            ...device,
            automatic: !device.automatic
          };
        }
        return device;
      });
    });
  };

  // Acknowledge alert
  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prevAlerts => {
      return prevAlerts.map(alert => {
        if (alert.id === alertId) {
          return {
            ...alert,
            acknowledged: true
          };
        }
        return alert;
      });
    });

    // Update dashboard stats
    setDashboardStats(prev => ({
      ...prev,
      activeAlerts: prev.activeAlerts - 1 > 0 ? prev.activeAlerts - 1 : 0
    }));
  };

  return (
    <DataContext.Provider
      value={{
        sensors,
        devices,
        alerts,
        mapNodes,
        dashboardStats,
        getSensorReadings,
        getWaterUsage,
        getWaterUsageChart,
        toggleDeviceStatus,
        toggleDeviceAutomatic,
        acknowledgeAlert,
        isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};