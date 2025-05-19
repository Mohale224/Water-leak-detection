import React from 'react';
import { Sensor } from '../../types';
import { Droplet, Gauge, Waves, Thermometer, CloudRain, FlaskRound as Flask, Battery, AlertTriangle } from 'lucide-react';

interface SensorCardProps {
  sensor: Sensor;
  onClick?: () => void;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onClick }) => {
  // Helper function to determine icon based on sensor type
  const getSensorIcon = () => {
    switch (sensor.type) {
      case 'flow':
        return <Droplet className="text-blue-500" />;
      case 'pressure':
        return <Gauge className="text-purple-500" />;
      case 'soilMoisture':
        return <Waves className="text-green-600" />;
      case 'waterLevel':
        return <Waves className="text-blue-600" />;
      case 'temperatureHumidity':
        return <Thermometer className="text-orange-500" />;
      case 'rainfall':
        return <CloudRain className="text-sky-500" />;
      case 'gas':
        return <Flask className="text-amber-500" />;
      default:
        return <Droplet className="text-blue-500" />;
    }
  };

  // Helper function to determine status colors
  const getStatusColor = () => {
    switch (sensor.status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format units for display
  const formatUnit = (unit: string) => {
    switch (unit) {
      case 'L/min':
        return 'L/min';
      case 'psi':
        return 'PSI';
      case '%':
        return '%';
      case '°C':
        return '°C';
      case 'mm':
        return 'mm';
      default:
        return unit;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-gray-100">
            {getSensorIcon()}
          </div>
          <h3 className="ml-2 font-medium text-gray-900">{sensor.name}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
          {sensor.status}
        </span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-500">{sensor.location}</p>
      </div>
      
      {sensor.lastReading && (
        <div className="mt-4">
          <p className="text-3xl font-semibold text-gray-900">
            {sensor.lastReading.value}
            <span className="text-sm font-normal ml-1 text-gray-500">
              {formatUnit(sensor.lastReading.unit)}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Last updated: {new Date(sensor.lastReading.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
      
      {sensor.batteryLevel !== undefined && (
        <div className="mt-2 flex items-center">
          <Battery className="h-4 w-4 text-gray-400 mr-1" />
          <div className="h-2 bg-gray-200 rounded-full w-full">
            <div 
              className={`h-2 rounded-full ${
                sensor.batteryLevel > 60 
                  ? 'bg-green-500' 
                  : sensor.batteryLevel > 30 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
              }`}
              style={{ width: `${sensor.batteryLevel}%` }}
            />
          </div>
          <span className="ml-2 text-xs text-gray-500">{sensor.batteryLevel}%</span>
        </div>
      )}
      
      {sensor.status === 'warning' || sensor.status === 'error' ? (
        <div className="mt-3 p-2 bg-red-50 rounded-md flex items-center text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Requires attention</span>
        </div>
      ) : null}
    </div>
  );
};

export default SensorCard;