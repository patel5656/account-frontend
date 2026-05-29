import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export function ComplaintDetails() {
  const navigate = useNavigate();
  const [isCustomerEnabled, setIsCustomerEnabled] = useState(false);

  return (
    <div className="bg-white min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Complain Summary</h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-[4px] rounded-[3px] text-[13px] font-medium flex items-center gap-1 transition-colors">
            <span className="text-lg leading-none mt-[-2px]">+</span> Book New
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2.5 py-[6px] rounded-[3px] flex items-center justify-center transition-colors"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap items-end gap-x-6 gap-y-3 bg-[#f8f9fa]">
        {/* Customer Name Toggle & Select */}
        <div className="flex flex-col gap-1 w-[220px]">
          <div className="flex flex-wrap items-center gap-2 px-1">
            <div 
              onClick={() => setIsCustomerEnabled(!isCustomerEnabled)}
              className={`w-8 h-[18px] rounded-full relative cursor-pointer border transition-colors duration-200 ${isCustomerEnabled ? 'bg-[#4F46E5] border-[#4F46E5]' : 'bg-gray-300 border-gray-400'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] transition-all duration-200 ${isCustomerEnabled ? 'right-[2px]' : 'left-[2px]'}`}></div>
            </div>
            <label className="text-[13px] font-bold text-gray-800">Customer Name</label>
          </div>
          <select 
            disabled={!isCustomerEnabled}
            className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white disabled:bg-gray-50 focus:border-[#4F46E5]"
          >
            <option>Select Name</option>
          </select>
        </div>

        {/* Barcode */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Barcode</label>
          <input 
            type="text" 
            placeholder="Barcode"
            className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white placeholder-gray-400 focus:border-[#4F46E5]"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Status</label>
          <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]">
            <option>Pending</option>
          </select>
        </div>

        {/* Filter By */}
        <div className="flex flex-col gap-1 w-[160px]">
          <label className="text-[13px] font-bold text-gray-800 px-1">Filter By</label>
          <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]">
            <option>Complain Date</option>
          </select>
        </div>

        {/* Date & Search */}
        <div className="flex flex-col gap-1 flex-1 w-full">
          <label className="text-[13px] font-bold text-[#4F46E5] px-1">Date(01-Jan-2000 to 25-May-2026)</label>
          <div className="flex gap-2">
            <select className="flex-1 h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5] max-w-[150px]">
              <option>Today</option>
            </select>
            <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-[5px] rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1 transition-colors">
              <Search className="w-3.5 h-3.5" strokeWidth={3} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center pt-24 bg-white relative">
        <h2 className="text-[26px] font-normal text-[#333] mb-3">No Complain Booked Yet</h2>
        <p className="text-[14px] text-[#555] mb-1">It seems that you do not have any Complain.</p>
        <p className="text-[14px] text-[#555] mb-8">Please Book one now.</p>
        
        {/* Large Document Icon */}
        <div className="text-[#333] mb-16">
          <svg width="90" height="110" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H42.1716C43.2325 0 44.2499 0.421427 45.0001 1.17157L58.8284 15C59.5786 15.7501 60 16.7675 60 17.8284V76C60 78.2091 58.2091 80 56 80H4C1.79086 80 0 78.2091 0 76V4ZM42 16H56.1716L42 1.82843V16ZM10 18H28V24H10V18ZM10 32H38V38H10V32ZM10 52H50V70H10V52ZM16 58H44V64H16V58Z" fill="#333333"/>
          </svg>
        </div>

        {/* Green Alert Box */}
        <div className="bg-[#5cb85c] text-white px-5 py-3 rounded-[3px] w-[350px] shadow-sm mb-8 mt-auto mx-auto border border-[#4cae4c]">
          <p className="text-[13px] leading-[1.4] font-medium">
            Thanks for Choosing OS-BOOKS. Your Invoice will be<br/>
            Shortly Genrated. Thanks
          </p>
        </div>
      </div>
    </div>
  );
}
