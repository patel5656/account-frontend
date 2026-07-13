import React from 'react';
import { 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { PieChart, BarChart2, LineChart } from 'lucide-react';
import { cn } from '../utils';

export function ChartSection({ chartData }) {
  const [timeframe, setTimeframe] = React.useState('30days');
  
  const dummyData = [
    { name: '29-May-26', sales: 7400 },
    { name: '31-May-26', sales: 500 },
    { name: '01-Jun-26', sales: 200 },
    { name: '02-Jun-26', sales: 8000 },
    { name: '05-Jun-26', sales: 800 },
    { name: '08-Jun-26', sales: 100 },
    { name: '09-Jun-26', sales: 800 },
    { name: '11-Jun-26', sales: 500 },
    { name: '13-Jun-26', sales: 9000 },
    { name: '16-Jun-26', sales: 7000 },
    { name: '17-Jun-26', sales: 200 }
  ];

  const dummyData12Months = [
    { name: 'Jan', sales: 15000 },
    { name: 'Feb', sales: 22000 },
    { name: 'Mar', sales: 18000 },
    { name: 'Apr', sales: 25000 },
    { name: 'May', sales: 32000 },
    { name: 'Jun', sales: 28000 },
    { name: 'Jul', sales: 34000 },
    { name: 'Aug', sales: 41000 },
    { name: 'Sep', sales: 38000 },
    { name: 'Oct', sales: 45000 },
    { name: 'Nov', sales: 52000 },
    { name: 'Dec', sales: 61000 }
  ];

  // For 12 months, we would normally aggregate this data as well.
  // We'll map the provided chartData for 30days and if timeframe is 12months we will use a fallback or an aggregated version.
  const displayData = timeframe === '30days' ? (chartData || []) : dummyData12Months;

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-gray-700 font-medium text-sm pr-2 border-r border-gray-200">
             <PieChart className="w-4 h-4" />
             <span>Sales</span>
          </div>
          <button 
            onClick={() => setTimeframe('30days')}
            className={cn("text-[13px] px-3 py-1 rounded-sm shadow-sm ml-2 transition-colors", timeframe === '30days' ? "bg-[#007bff] text-white" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50")}
          >
            30 Days
          </button>
          <button 
            onClick={() => setTimeframe('12months')}
            className={cn("text-[13px] px-3 py-1 rounded-sm transition-colors", timeframe === '12months' ? "bg-[#007bff] text-white shadow-sm" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50")}
          >
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
      <div className="p-4 flex-1 relative min-h-[300px] notranslate" translate="no">
         <div className="flex justify-center mb-4">
           <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-3 bg-[#3b82f6]"></div>
              <span>Sales</span>
           </div>
         </div>
         <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={displayData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#adb5bd', fontSize: 12 }} 
            />
            <Bar dataKey="sales" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
