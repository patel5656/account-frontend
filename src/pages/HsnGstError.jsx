import React, { useState } from 'react';

export function HsnGstError() {
  const [filterType, setFilterType] = useState('both');

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col p-4">
      <div className="bg-white border border-gray-200 rounded-[3px] shadow-sm flex flex-col">
        
        {/* Header */}
        <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-[15px] text-gray-800">HSN & GST Error</h2>
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-3 py-1 text-[12px] font-bold rounded-[3px]">
            HSN & GST
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 flex flex-col gap-2 border-b border-gray-200">
          <label className="text-[13px] font-bold text-gray-800">Select Period</label>
          <div className="flex flex-wrap items-center gap-8">
            <select className="w-[300px] h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]">
              <option>Select</option>
            </select>
            
            <div className="flex flex-wrap items-center gap-6 ml-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="filterType"
                  checked={filterType === 'both'}
                  onChange={() => setFilterType('both')}
                  className="w-3.5 h-3.5 accent-[#007bff]"
                />
                <span className="text-[13px] text-gray-700">Show HSN & GST</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="filterType"
                  checked={filterType === 'hsn'}
                  onChange={() => setFilterType('hsn')}
                  className="w-3.5 h-3.5 accent-[#007bff]"
                />
                <span className="text-[13px] text-gray-700">Show HSN only</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="filterType"
                  checked={filterType === 'gst'}
                  onChange={() => setFilterType('gst')}
                  className="w-3.5 h-3.5 accent-[#007bff]"
                />
                <span className="text-[13px] text-gray-700">Show GST only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="py-2 px-4 text-center text-[12px] font-bold text-gray-800 border-b border-r border-gray-300 w-[80px] whitespace-nowrap">#</th>
                <th className="py-2 px-4 text-center text-[12px] font-bold text-gray-800 border-b border-r border-gray-300 whitespace-nowrap">Product Name</th>
                <th className="py-2 px-4 text-center text-[12px] font-bold text-gray-800 border-b border-r border-gray-300 w-[200px] whitespace-nowrap">HSN/SAC</th>
                <th className="py-2 px-4 text-center text-[12px] font-bold text-gray-800 border-b border-gray-300 w-[200px] whitespace-nowrap">GST</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state as per screenshot */}
            </tbody>
          </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
