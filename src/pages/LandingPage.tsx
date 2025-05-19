import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ShieldCheck, TrendingUp, BarChart, Gauge, Zap, Award, Smartphone } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 mix-blend-multiply" />
          <img
            src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Water background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Water IQ System
          </h1>
          <p className="mt-6 max-w-xl text-xl text-cyan-100">
            Smart water monitoring and leak detection system for homes and businesses. Save water, prevent damage, and gain valuable insights into your water usage.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="inline-block bg-white py-3 px-8 rounded-md font-medium text-cyan-600 hover:bg-cyan-50"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="inline-block bg-cyan-600 py-3 px-8 rounded-md font-medium text-white hover:bg-cyan-700"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature section */}
      <div className="py-16 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Intelligent Water Management
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Water IQ System combines advanced sensors, real-time monitoring, and AI-powered analytics to help you manage water usage and prevent costly damage.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <ShieldCheck className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Leak Detection</h3>
                <p className="mt-2 text-gray-600">
                  Detect leaks early with advanced flow and pressure monitoring. Get instant alerts when anomalies are detected.
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <TrendingUp className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Usage Analytics</h3>
                <p className="mt-2 text-gray-600">
                  Track water consumption patterns over time. Identify opportunities to conserve water and reduce costs.
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <BarChart className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Environmental Monitoring</h3>
                <p className="mt-2 text-gray-600">
                  Monitor soil moisture, temperature, and humidity to optimize irrigation and water usage.
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <Gauge className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Pressure Monitoring</h3>
                <p className="mt-2 text-gray-600">
                  Track water pressure in real-time to detect potential issues before they cause damage.
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <Zap className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Automated Controls</h3>
                <p className="mt-2 text-gray-600">
                  Control valves, pumps, and irrigation systems remotely or set up automated rules.
                </p>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-cyan-100 rounded-lg p-3 inline-block">
                  <Smartphone className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Mobile Access</h3>
                <p className="mt-2 text-gray-600">
                  Access your water system from anywhere. Get alerts and control devices through our mobile-friendly interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-cyan-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                Ready to take control of your water system?
              </h2>
              <p className="mt-4 text-lg text-cyan-100">
                Join thousands of homes and businesses that trust Water IQ System for their water management needs. Get started today!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-block bg-white py-3 px-8 rounded-md font-medium text-cyan-600 hover:bg-cyan-50"
                >
                  Get Started
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-block bg-cyan-600 border border-white py-3 px-8 rounded-md font-medium text-white hover:bg-cyan-700"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Professional Plan</h3>
                      <div className="mt-4 flex items-baseline text-5xl font-extrabold text-gray-900">
                        M29<span className="ml-1 text-xl font-medium text-gray-500">/month</span>
                      </div>
                    </div>
                    <div className="bg-cyan-100 p-2 rounded-full">
                      <Award className="h-6 w-6 text-cyan-600" />
                    </div>
                  </div>
                  <p className="mt-5 text-gray-500">
                    Complete water monitoring system with advanced leak detection and analytics.
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8 bg-gray-50 sm:px-10 sm:py-10">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Real-time leak detection</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Water usage analytics</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Environmental monitoring</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Mobile and web access</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Droplet className="h-10 w-10 text-cyan-400" />
              <span className="ml-2 text-xl font-bold text-white">Water IQ System</span>
            </div>
            <div className="mt-8 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Water IQ System. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;