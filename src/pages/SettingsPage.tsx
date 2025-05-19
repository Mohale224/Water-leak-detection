import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, User, BellRing, Droplet, Shield, Sliders, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              <a 
                href="#profile" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-cyan-50 text-cyan-700"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </a>
              <a 
                href="#notifications" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <BellRing className="h-5 w-5 mr-2" />
                Notifications
              </a>
              <a 
                href="#system" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Settings className="h-5 w-5 mr-2" />
                System
              </a>
              <a 
                href="#thresholds" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Sliders className="h-5 w-5 mr-2" />
                Alert Thresholds
              </a>
              <a 
                href="#security" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Shield className="h-5 w-5 mr-2" />
                Security
              </a>
            </nav>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="md:col-span-3">
          {/* Profile Section */}
          <div id="profile" className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Profile Settings</h2>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                  <User className="h-12 w-12" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                    {user?.role}
                  </span>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  Change Avatar
                </button>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={user?.name}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          {/* Notification Settings */}
          <div id="notifications" className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive alerts and updates via email</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="email-toggle" 
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label 
                    htmlFor="email-toggle" 
                    className="absolute top-0 left-0 right-0 bottom-0 bg-cyan-600 rounded-full cursor-pointer transition-all before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 checked:before:translate-x-6"
                  >
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">SMS Alerts</h3>
                  <p className="text-sm text-gray-500">Get critical alerts via text message</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="sms-toggle" 
                    className="opacity-0 w-0 h-0"
                  />
                  <label 
                    htmlFor="sms-toggle" 
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full cursor-pointer transition-all before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 checked:before:translate-x-6"
                  >
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Mobile Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive alerts on your mobile device</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input 
                    type="checkbox" 
                    id="push-toggle" 
                    className="opacity-0 w-0 h-0"
                    defaultChecked
                  />
                  <label 
                    htmlFor="push-toggle" 
                    className="absolute top-0 left-0 right-0 bottom-0 bg-cyan-600 rounded-full cursor-pointer transition-all before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-200 checked:before:translate-x-6"
                  >
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Alert Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="leak-alerts" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="leak-alerts" className="ml-2 block text-sm text-gray-700">
                      Leak Detection Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="pressure-alerts" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="pressure-alerts" className="ml-2 block text-sm text-gray-700">
                      Pressure Anomaly Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="level-alerts" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="level-alerts" className="ml-2 block text-sm text-gray-700">
                      Water Level Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="system-alerts" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="system-alerts" className="ml-2 block text-sm text-gray-700">
                      System Status Updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="usage-alerts" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label htmlFor="usage-alerts" className="ml-2 block text-sm text-gray-700">
                      Usage Reports (Weekly Summary)
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
          
          {/* System Settings */}
          <div id="system" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">System Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">System Units</h3>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="metric" 
                      name="units" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="metric" className="ml-2 block text-sm text-gray-700">
                      Metric (Liters, Celsius)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="imperial" 
                      name="units" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
                    />
                    <label htmlFor="imperial" className="ml-2 block text-sm text-gray-700">
                      Imperial (Gallons, Fahrenheit)
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Data Collection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="interval" className="block text-sm text-gray-700 mb-1">
                      Sensor Reading Interval
                    </label>
                    <select
                      id="interval"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    >
                      <option value="1">Every 1 minute</option>
                      <option value="5" selected>Every 5 minutes</option>
                      <option value="15">Every 15 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every hour</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="retention" className="block text-sm text-gray-700 mb-1">
                      Data Retention Period
                    </label>
                    <select
                      id="retention"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    >
                      <option value="30">30 days</option>
                      <option value="90" selected>90 days</option>
                      <option value="180">6 months</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Automatic Controls</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="auto-shutoff" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="auto-shutoff" className="ml-2 block text-sm text-gray-700">
                      Automatic shutoff when leak detected
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="auto-irrigation" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="auto-irrigation" className="ml-2 block text-sm text-gray-700">
                      Adjust irrigation based on soil moisture
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="auto-weather" 
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-weather" className="ml-2 block text-sm text-gray-700">
                      Adjust irrigation based on weather forecast
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;