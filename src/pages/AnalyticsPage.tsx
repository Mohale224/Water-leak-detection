import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import UsageChart from '../components/dashboard/UsageChart';
import { 
  Calendar, 
  ArrowRight, 
  BarChart, 
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Droplet,
  Download
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { getWaterUsageChart, getWaterUsage, isLoading } = useData();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Get chart data
  const usageChartData = getWaterUsageChart();
  
  // Get water usage data
  const waterUsage = getWaterUsage();
  
  // Calculate total usage
  const totalUsage = waterUsage.reduce((sum, item) => sum + item.volume, 0);
  
  // Calculate average daily usage
  const avgDailyUsage = Math.round(totalUsage / waterUsage.length);
  
  // Calculate domestic vs irrigation usage
  const domesticUsage = waterUsage
    .filter(item => item.purpose === 'Domestic')
    .reduce((sum, item) => sum + item.volume, 0);
  
  const irrigationUsage = waterUsage
    .filter(item => item.purpose === 'Irrigation')
    .reduce((sum, item) => sum + item.volume, 0);
  
  // Calculate percentage
  const domesticPercentage = Math.round((domesticUsage / totalUsage) * 100);
  const irrigationPercentage = Math.round((irrigationUsage / totalUsage) * 100);

  // Calculate consumption trend (simplified for demo)
  const firstHalf = waterUsage.slice(0, Math.floor(waterUsage.length / 2));
  const secondHalf = waterUsage.slice(Math.floor(waterUsage.length / 2));
  
  const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.volume, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.volume, 0) / secondHalf.length;
  
  const trend = secondHalfAvg - firstHalfAvg;
  const trendPercentage = Math.abs(Math.round((trend / firstHalfAvg) * 100));
  const trendDirection = trend >= 0 ? 'up' : 'down';
  
  // Mock usage by location data
  const usageByLocation = [
    { location: 'Main House', volume: 2250 },
    { location: 'Garden', volume: 850 },
    { location: 'Pool', volume: 350 },
    { location: 'Outdoor Taps', volume: 200 },
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Water Analytics</h1>
        <p className="text-gray-600">Detailed water usage insights and analytics</p>
      </div>
      
      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Time Range</h3>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-4 py-2 rounded-md ${
                timeRange === 'daily' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-4 py-2 rounded-md ${
                timeRange === 'weekly' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-2 rounded-md ${
                timeRange === 'monthly' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
          
          <button className="flex items-center text-cyan-600 hover:text-cyan-800">
            <Download className="h-4 w-4 mr-1" />
            Export Data
          </button>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-sm text-gray-500 mb-1">Total Usage</h4>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">{totalUsage.toLocaleString()}</span>
            <span className="ml-1 text-sm text-gray-500">liters</span>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <Droplet className="h-4 w-4 mr-1 text-cyan-500" />
            <span>Past 30 days</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-sm text-gray-500 mb-1">Average Daily</h4>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">{avgDailyUsage.toLocaleString()}</span>
            <span className="ml-1 text-sm text-gray-500">liters/day</span>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <Calendar className="h-4 w-4 mr-1 text-blue-500" />
            <span>Based on recent activity</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-sm text-gray-500 mb-1">Consumption Trend</h4>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">{trendPercentage}%</span>
            <span className={`ml-2 flex items-center ${
              trendDirection === 'down' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trendDirection === 'down' ? (
                <TrendingDown className="h-4 w-4 mr-1" />
              ) : (
                <TrendingUp className="h-4 w-4 mr-1" />
              )}
              {trendDirection === 'down' ? 'Decrease' : 'Increase'}
            </span>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <ArrowRight className="h-4 w-4 mr-1 text-purple-500" />
            <span>Compared to previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h4 className="text-sm text-gray-500 mb-1">Usage Breakdown</h4>
          <div className="flex items-baseline gap-2">
            <div>
              <span className="text-lg font-semibold text-gray-900">{domesticPercentage}%</span>
              <span className="ml-1 text-xs text-gray-500">Domestic</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900">{irrigationPercentage}%</span>
              <span className="ml-1 text-xs text-gray-500">Irrigation</span>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-cyan-600 rounded-full"
              style={{ width: `${domesticPercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <PieChart className="h-4 w-4 mr-1 text-amber-500" />
            <span>By purpose</span>
          </div>
        </div>
      </div>
      
      {/* Main Usage Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Water Usage Trends</h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <BarChart className="h-5 w-5" />
            </button>
            <button className="p-1 rounded text-cyan-600 hover:text-cyan-800 hover:bg-gray-100">
              <LineChart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <UsageChart 
          data={usageChartData} 
          height={350} 
          title={`Water Usage - ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} View`}
        />
      </div>
      
      {/* Additional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage by Location */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Usage by Location</h3>
          
          <div className="space-y-4">
            {usageByLocation.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.location}</span>
                  <div className="flex items-baseline">
                    <span className="text-sm font-medium">{item.volume}</span>
                    <span className="ml-1 text-xs text-gray-500">liters</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-cyan-600' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.round((item.volume / 3650) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-sm text-gray-500 flex items-start">
            <BarChart className="h-5 w-5 mr-1 flex-shrink-0 text-blue-500" />
            <p>
              This chart shows water consumption by different areas of your property. The garden 
              and outdoor usage can be reduced through more efficient irrigation practices.
            </p>
          </div>
        </div>
        
        {/* Consumption Insights */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Consumption Insights</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start">
                <TrendingDown className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Savings Opportunity</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Reducing irrigation during evening hours could save up to 15% on water consumption.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <Droplet className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800">Usage Pattern Detected</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Your water usage peaks between 6-8 AM and 7-9 PM daily. Adjusting usage to off-peak hours 
                    may reduce pressure on the system.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Seasonal Trend</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Water usage typically increases by 30% during summer months. Preparing efficient 
                    irrigation schedules could help manage this seasonal increase.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p className="font-medium mb-1">Recommendations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Install low-flow fixtures in main bathrooms</li>
              <li>Adjust irrigation schedule based on soil moisture readings</li>
              <li>Check for leaks in the main supply line</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;