import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AlertItem from '../components/common/AlertItem';
import { Alert } from '../types';
import { Search, Filter, BellOff, Bell } from 'lucide-react';

const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, isLoading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Alert['type'] | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<Alert['severity'] | 'all'>('all');
  const [showAcknowledged, setShowAcknowledged] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  // Filter alerts based on filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesAcknowledged = showAcknowledged ? true : !alert.acknowledged;
    
    return matchesSearch && matchesType && matchesSeverity && matchesAcknowledged;
  }).sort((a, b) => {
    // Sort by acknowledged status first, then by timestamp
    if (a.acknowledged === b.acknowledged) {
      return b.timestamp - a.timestamp; // Most recent first
    }
    return a.acknowledged ? 1 : -1; // Unacknowledged first
  });

  // Get unique alert types for filter dropdown
  const alertTypes = Array.from(new Set(alerts.map(alert => alert.type)));
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-600">Manage and respond to system alerts</p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            />
          </div>
          
          {/* Type filter */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as Alert['type'] | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            >
              <option value="all">All Types</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Severity filter */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as Alert['severity'] | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          {/* Acknowledged toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowAcknowledged(!showAcknowledged)}
              className={`flex items-center px-3 py-2 rounded-md ${
                showAcknowledged 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-cyan-100 text-cyan-800'
              }`}
            >
              {showAcknowledged ? (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Show All
                </>
              ) : (
                <>
                  <BellOff className="h-4 w-4 mr-2" />
                  Hide Acknowledged
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Active filters display */}
        {(selectedType !== 'all' || selectedSeverity !== 'all' || searchTerm) && (
          <div className="mt-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filters:</span>
            
            {selectedType !== 'all' && (
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Type: {selectedType}
              </span>
            )}
            
            {selectedSeverity !== 'all' && (
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Severity: {selectedSeverity}
              </span>
            )}
            
            {searchTerm && (
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Search: {searchTerm}
              </span>
            )}
            
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedSeverity('all');
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      
      {/* Alerts list */}
      {filteredAlerts.length > 0 ? (
        <div className="space-y-2">
          {filteredAlerts.map(alert => (
            <AlertItem 
              key={alert.id} 
              alert={alert} 
              onAcknowledge={acknowledgeAlert}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <BellOff className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No alerts found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedSeverity('all');
              setShowAcknowledged(true);
            }}
            className="mt-2 text-cyan-600 hover:text-cyan-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;