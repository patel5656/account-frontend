import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Filter, Download } from 'lucide-react';
import { cn } from '../utils';

export function StockPriceUpdate() {
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="bg-white min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex flex-wrap justify-between items-center gap-2 text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Stock Price Update</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* View All Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-bold">View All</span>
            <div 
              onClick={() => setViewAll(!viewAll)}
              className={cn(
                "w-8 h-[18px] rounded-full relative cursor-pointer transition-colors duration-200",
                viewAll ? "bg-white" : "bg-[#3b32c4]"
              )}
            >
              <div className={cn(
                "w-3.5 h-3.5 rounded-full absolute top-[1px] transition-all duration-200 shadow-sm",
                viewAll ? "right-[2px] bg-[#4F46E5]" : "left-[2px] bg-white"
              )}></div>
            </div>
            <span className="text-[13px] font-medium ml-1">View Modified</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 ml-2">
            <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-[5px] rounded-[3px] text-[12px] font-bold transition-colors">
              Bulk Price Update
            </button>
            <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-[5px] rounded-[3px] text-[12px] font-bold transition-colors">
              Bulk Update
            </button>
            <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-[5px] rounded-[3px] text-[12px] font-bold flex items-center gap-1.5 transition-colors">
              <Download className="w-[14px] h-[14px]" strokeWidth={2.5} /> Export
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2 py-[5px] rounded-[3px] flex items-center justify-center transition-colors ml-1"
            >
              <X className="w-[14px] h-[14px]" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <label className="text-[12px] font-bold text-gray-800 mb-1.5 block">Search Product</label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-1 border border-gray-300 rounded-[3px] overflow-hidden">
              <div className="bg-white border-r border-gray-300 px-3 flex items-center justify-center">
                <Filter className="w-4 h-4 text-[#007bff]" strokeWidth={2.5} />
              </div>
              <select className="w-[180px] bg-white border-r border-gray-300 px-2 py-[5px] text-[13px] outline-none text-gray-700">
                <option>Product Name</option>
              </select>
              <input 
                type="text" 
                placeholder="Search for Product Name" 
                className="flex-1 px-3 py-[5px] text-[13px] outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            
            <select className="w-full sm:w-[300px] min-w-0 border border-gray-300 rounded-[3px] px-2 py-[6px] text-[13px] outline-none text-gray-700 bg-white">
              <option>Show All</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-start justify-center pt-10">
          <p className="text-gray-500 text-[14px]">No records found.</p>
        </div>
      </div>
    </div>
  );
}
