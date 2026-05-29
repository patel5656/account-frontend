import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';

export function ExpiryReport() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Expiry Report</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5 font-bold" strokeWidth={4} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col gap-1 w-full max-w-[min(92vw,500px)] mb-8">
            <div className="flex flex-wrap items-center gap-20">
              <label className="text-[14px] font-bold text-gray-800">Expiry In :</label>
              <span className="text-[13px] font-bold text-[#4F46E5]">(23-May-2026 to 29-May-2026)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1">
                <select className="w-full h-[34px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-800 appearance-none pr-8 bg-white font-medium cursor-pointer focus:border-[#4F46E5]">
                  <option>Expired Already</option>
                  <option>Next 7 Days</option>
                  <option>Next 15 Days</option>
                  <option>Next 30 Days</option>
                  <option>Next 3 Months</option>
                  <option>Next 6 Months</option>
                  <option>Custom Date Range</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-wrap items-center gap-1 pointer-events-none text-gray-400">
                  <X className="w-3 h-3" />
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-transparent border-t-gray-500"></div>
                </div>
              </div>
              <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded-[3px] flex items-center gap-1.5 text-[14px] font-bold transition-colors shadow-sm">
                <Search className="w-4 h-4" strokeWidth={2.5} />
                Search
              </button>
            </div>
          </div>

          <div className="text-center text-gray-500 text-[14px] font-normal">
            Select date range and click Search to load expiry report.
          </div>
        </div>

      </div>
    </div>
  );
}
