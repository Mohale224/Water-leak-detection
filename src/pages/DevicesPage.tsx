import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DeviceCard from '../components/common/DeviceCard';
import { Device } from '../types';
import { Search, Filter } from 'lucide-react';

const DevicesPage: React.FC = () => {
  const { devices, toggleDeviceStatus, toggleDeviceAutomatic, isLoading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Device['type'] | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Device['status'] | 'all'>('all');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading devices...</p>
        </div>
      </div>
    );
  }

  // Filter devices based on search term, type and status
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || device.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get unique device types for filter dropdown
  const deviceTypes = Array.from(new Set(devices.map(device => device.type)));
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
        <p className="text-gray-600">Control and manage your connected water devices</p>
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
              placeholder="Search devices by name or location..."
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
              onChange={(e) => setSelectedType(e.target.value as Device['type'] | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            >
              <option value="all">All Types</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status filter */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Device['status'] | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            >
              <option value="all">All Statuses</option>
              <option value="on">On</option>
              <option value="off">Off</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
        
        {/* Active filters display */}
        {(selectedType !== 'all' || selectedStatus !== 'all' || searchTerm) && (
          <div className="mt-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filters:</span>
            
            {selectedType !== 'all' && (
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Type: {selectedType}
              </span>
            )}
            
            {selectedStatus !== 'all' && (
              <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Status: {selectedStatus}
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
                setSelectedStatus('all');
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
      
      {/* Devices grid */}
      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map(device => (
            <DeviceCard 
              key={device.id} 
              device={device} 
              onToggleStatus={toggleDeviceStatus}
              onToggleAutomatic={toggleDeviceAutomatic}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No devices found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedStatus('all');
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

export default DevicesPage;