import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X,
  ChevronsUpDown
} from 'lucide-react';

export function VoucherMaster() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Voucher Details</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors shadow-sm"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex items-center w-full max-w-full">
            <div className="flex items-center bg-white min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-2 text-blue-500">
              <FilterIcon className="w-4 h-4" />
            </div>
            <select className="min-w-0 border border-gray-300 border-l-0 px-3 py-2 text-[13px] outline-none bg-white text-gray-600 w-full">
              <option>Voucher Type</option>
              <option>Voucher Id</option>
              <option>Voucher Head</option>
            </select>
            <input 
              type="text" 
              placeholder="Search for..." 
              className="flex-1 min-w-0 border border-gray-300 border-l-0 rounded-r-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1">
          <div className="w-full w-full">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_1fr_1fr_100px] border-b border-gray-200">
              <HeaderCell text="#" />
              <HeaderCell text="Voucher Type" />
              <HeaderCell text="Voucher Head" />
              <HeaderCell text="Voucher Id" />
              <HeaderCell text="Action" />
            </div>

            {/* Empty State Row */}
            <div className="py-3 px-4 text-[13px] text-gray-600 border-b border-gray-200">
              No data to display
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

const HeaderCell = ({ text }) => (
  <div className="py-2 px-3 flex items-center justify-between cursor-pointer group hover:bg-gray-50">
    <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-700">{text}</span>
    <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />
  </div>
);

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
