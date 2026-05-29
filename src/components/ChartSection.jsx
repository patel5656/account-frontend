import React from 'react';
import { 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { PieChart, BarChart2, LineChart } from 'lucide-react';
import { cn } from '../utils';

export function ChartSection() {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-gray-700 font-medium text-sm pr-2 border-r border-gray-200">
             <PieChart className="w-4 h-4" />
             <span>Sales</span>
          </div>
          <button className="bg-[#007bff] text-white text-[13px] px-3 py-1 rounded-sm shadow-sm ml-2">
            30 Days
          </button>
          <button className="bg-white text-gray-600 border border-gray-300 text-[13px] px-3 py-1 rounded-sm hover:bg-gray-50">
            12 Months
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-1 mt-3 sm:mt-0">
          <button className="p-1 bg-[#007bff] text-white rounded-sm border border-[#007bff]">
            <BarChart2 className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
          <button className="p-1 bg-white text-gray-500 rounded-sm border border-gray-300 hover:bg-gray-50">
            <LineChart className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Chart Area Placeholder */}
      <div className="p-4 flex-1 relative min-h-[300px]">
         <div className="flex justify-center mb-4">
           <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-3 bg-[#4F46E5]"></div>
              <span>Sales</span>
           </div>
         </div>
         <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={[]}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#adb5bd', fontSize: 12 }} 
              domain={[0, 1.0]} 
              tickCount={11}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
