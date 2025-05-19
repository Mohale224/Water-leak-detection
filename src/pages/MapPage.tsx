import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SystemMap from '../components/dashboard/SystemMap';
import { Maximize, Minimize, Info } from 'lucide-react';

const MapPage: React.FC = () => {
  const { mapNodes, sensors, devices, isLoading } = useData();
  const [mapSize, setMapSize] = useState<{ width: number, height: number }>({ width: 800, height: 500 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  const toggleFullScreen = () => {
    if (isFullScreen) {
      setMapSize({ width: 800, height: 500 });
    } else {
      setMapSize({ width: 1200, height: 800 });
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Map</h1>
        <p className="text-gray-600">Interactive visualization of your water system</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Water System Layout</h2>
          <button
            onClick={toggleFullScreen}
            className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
          >
            {isFullScreen ? (
              <>
                <Minimize className="h-4 w-4 mr-2" />
                Reduce Size
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4 mr-2" />
                Expand Map
              </>
            )}
          </button>
        </div>
        
        <div className={`overflow-auto bg-gray-50 rounded-lg border p-4 ${isFullScreen ? 'h-[800px]' : ''}`}>
          <SystemMap 
            nodes={mapNodes} 
            width={mapSize.width} 
            height={mapSize.height} 
          />
        </div>
        
        <div className="mt-4 text-sm text-gray-500 flex items-start">
          <Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
          <p>
            This interactive map shows the layout of your water system. Nodes represent sensors, 
            devices, junctions, and tanks. Lines show connections between components. Yellow indicates 
            warning states, while red indicates errors or issues that need immediate attention.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Statistics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-900">System Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Sensors:</span>
              <span className="font-medium">{sensors.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Online Sensors:</span>
              <span className="font-medium">{sensors.filter(s => s.status === 'online').length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Total Devices:</span>
              <span className="font-medium">{devices.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Active Devices:</span>
              <span className="font-medium">{devices.filter(d => d.status === 'on').length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">System Junctions:</span>
              <span className="font-medium">{mapNodes.filter(n => n.type === 'junction').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Water Tanks:</span>
              <span className="font-medium">{mapNodes.filter(n => n.type === 'tank').length}</span>
            </div>
          </div>
        </div>
        
        {/* Component Status */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Component Status</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Sensors</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center p-2 bg-green-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Online: {sensors.filter(s => s.status === 'online').length}</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-sm text-gray-700">Offline: {sensors.filter(s => s.status === 'offline').length}</span>
                </div>
                <div className="flex items-center p-2 bg-yellow-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Warning: {sensors.filter(s => s.status === 'warning').length}</span>
                </div>
                <div className="flex items-center p-2 bg-red-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Error: {sensors.filter(s => s.status === 'error').length}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Devices</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center p-2 bg-green-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">On: {devices.filter(d => d.status === 'on').length}</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-sm text-gray-700">Off: {devices.filter(d => d.status === 'off').length}</span>
                </div>
                <div className="flex items-center p-2 bg-red-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Error: {devices.filter(d => d.status === 'error').length}</span>
                </div>
                <div className="flex items-center p-2 bg-blue-50 rounded">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Auto: {devices.filter(d => d.automatic).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;