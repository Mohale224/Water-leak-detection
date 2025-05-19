import React from 'react';
import { useData } from '../context/DataContext';
import StatCard from '../components/common/StatCard';
import SensorCard from '../components/common/SensorCard';
import AlertItem from '../components/common/AlertItem';
import SystemMap from '../components/dashboard/SystemMap';
import UsageChart from '../components/dashboard/UsageChart';
import { 
  Droplet, 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { 
    sensors, 
    alerts, 
    mapNodes, 
    dashboardStats, 
    getWaterUsageChart,
    acknowledgeAlert,
    isLoading 
  } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  // Filter to only show up to 3 unacknowledged alerts
  const recentAlerts = alerts
    .filter(alert => !alert.acknowledged)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);

  // Filter to only show online sensors
  const onlineSensors = sensors
    .filter(sensor => sensor.status === 'online')
    .slice(0, 4);

  // Get usage chart data
  const usageChartData = getWaterUsageChart();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Water Monitoring Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your water system</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Water Usage"
          value={dashboardStats.totalWaterUsage}
          unit="liters today"
          icon={Droplet}
          iconColor="bg-cyan-600"
          change={{ value: -5, isPositive: true }}
        />
        <StatCard
          title="Active Alerts"
          value={dashboardStats.activeAlerts}
          icon={AlertTriangle}
          iconColor="bg-orange-500"
        />
        <StatCard
          title="Leak Probability"
          value={dashboardStats.leakProbability}
          unit="%"
          icon={TrendingDown}
          iconColor="bg-amber-500"
          helpText="Based on flow and pressure patterns"
        />
        <StatCard
          title="System Health"
          value={dashboardStats.healthScore}
          unit="/100"
          icon={ShieldCheck}
          iconColor="bg-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Water usage chart */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-900">Water Usage Trends</h2>
              <Link 
                to="/analytics" 
                className="text-sm text-cyan-600 hover:text-cyan-800 flex items-center"
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <UsageChart data={usageChartData} />
          </div>

          {/* System map */}
          <SystemMap nodes={mapNodes} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Sensors */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-900">Sensors</h2>
              <Link 
                to="/sensors" 
                className="text-sm text-cyan-600 hover:text-cyan-800 flex items-center"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {onlineSensors.map(sensor => (
                <SensorCard 
                  key={sensor.id} 
                  sensor={sensor} 
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
              <Link 
                to="/alerts" 
                className="text-sm text-cyan-600 hover:text-cyan-800 flex items-center"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div>
              {recentAlerts.length > 0 ? (
                recentAlerts.map(alert => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onAcknowledge={acknowledgeAlert} 
                  />
                ))
              ) : (
                <div className="text-center p-6 bg-green-50 rounded-lg text-green-800">
                  <ShieldCheck className="h-8 w-8 mx-auto mb-2" />
                  <p>No active alerts at this time</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;