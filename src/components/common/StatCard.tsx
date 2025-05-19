import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor: string;
  unit?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  helpText?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  unit,
  change,
  helpText,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-baseline mt-1">
            <h3 className="text-2xl font-semibold">{value}</h3>
            {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
          </div>
          
          {change && (
            <div 
              className={`mt-2 flex items-center text-sm ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="ml-1 text-gray-500">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${iconColor}`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      
      {helpText && (
        <p className="mt-4 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default StatCard;