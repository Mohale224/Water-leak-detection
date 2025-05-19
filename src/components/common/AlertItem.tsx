import React from 'react';
import { Alert } from '../../types';
import { 
  AlertTriangle, 
  Info, 
  Droplets, 
  Gauge, 
  Waves, 
  CloudRain, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (alertId: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onAcknowledge }) => {
  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Helper function to determine icon based on alert type
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'leak':
        return <Droplets className="text-blue-500" />;
      case 'pressure':
        return <Gauge className="text-purple-500" />;
      case 'level':
        return <Waves className="text-blue-600" />;
      case 'moisture':
        return <Waves className="text-green-600" />;
      case 'weather':
        return <CloudRain className="text-sky-500" />;
      case 'system':
        return <Info className="text-gray-500" />;
      default:
        return <AlertTriangle className="text-yellow-500" />;
    }
  };

  // Helper function to determine severity colors
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  // Helper function for alert description
  const getAlertTypeDescription = () => {
    switch (alert.type) {
      case 'leak':
        return 'Water Leak';
      case 'pressure':
        return 'Pressure Issue';
      case 'level':
        return 'Water Level';
      case 'moisture':
        return 'Soil Moisture';
      case 'weather':
        return 'Weather Alert';
      case 'system':
        return 'System Notice';
      default:
        return 'Alert';
    }
  };

  return (
    <div 
      className={`p-4 mb-3 rounded-lg border ${getSeverityColor()} ${
        alert.acknowledged ? 'opacity-60' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-white mr-3">
            {getAlertIcon()}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-medium">{getAlertTypeDescription()}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                alert.severity === 'critical' ? 'bg-red-200 text-red-800' :
                alert.severity === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-sm mt-1">{alert.message}</p>
          </div>
        </div>
        
        {!alert.acknowledged && (
          <button 
            onClick={() => onAcknowledge(alert.id)}
            className="text-sm flex items-center px-3 py-1 bg-white rounded-md border hover:bg-gray-50"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Acknowledge
          </button>
        )}
      </div>
      
      <div className="mt-2 text-xs flex items-center justify-between">
        <span>
          {formatTimestamp(alert.timestamp)}
        </span>
        {alert.acknowledged && (
          <span className="flex items-center text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Acknowledged
          </span>
        )}
      </div>
    </div>
  );
};

export default AlertItem;