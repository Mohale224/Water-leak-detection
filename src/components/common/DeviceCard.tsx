import React from 'react';
import { Device } from '../../types';
import { Power, Zap, Gauge, Droplets, Filter } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onToggleStatus: (deviceId: string) => void;
  onToggleAutomatic: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  onToggleStatus, 
  onToggleAutomatic 
}) => {
  // Helper function to determine icon based on device type
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'pump':
        return <Zap className="text-purple-500" />;
      case 'valve':
        return <Gauge className="text-blue-500" />;
      case 'irrigator':
        return <Droplets className="text-green-500" />;
      case 'filter':
        return <Filter className="text-amber-500" />;
      default:
        return <Power className="text-gray-500" />;
    }
  };

  // Helper function to determine status colors
  const getStatusColor = () => {
    switch (device.status) {
      case 'on':
        return 'bg-green-500';
      case 'off':
        return 'bg-gray-300';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-gray-100">
            {getDeviceIcon()}
          </div>
          <h3 className="ml-2 font-medium text-gray-900">{device.name}</h3>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor()}`}></div>
          <span className="text-sm text-gray-600">{device.status.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500">{device.location}</p>
      </div>

      <div className="flex flex-col space-y-3">
        {/* Power toggle button */}
        <button
          onClick={() => onToggleStatus(device.id)}
          className={`px-4 py-2 rounded-md flex items-center justify-center transition-colors 
            ${device.status === 'on' 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <Power className="h-4 w-4 mr-2" />
          {device.status === 'on' ? 'Turn Off' : 'Turn On'}
        </button>
        
        {/* Auto mode toggle */}
        <button
          onClick={() => onToggleAutomatic(device.id)}
          className={`px-4 py-2 rounded-md flex items-center justify-center transition-colors
            ${device.automatic 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <Zap className="h-4 w-4 mr-2" />
          {device.automatic ? 'Auto: ON' : 'Auto: OFF'}
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        {device.automatic 
          ? 'Device is in automatic mode and will be controlled by the system.' 
          : 'Device is in manual mode and requires manual control.'}
      </div>
    </div>
  );
};

export default DeviceCard;