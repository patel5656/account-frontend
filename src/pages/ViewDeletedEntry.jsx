import React, { useState } from 'react';
import { cn } from '../utils';

export function ViewDeletedEntry() {
  const [searchByActive, setSearchByActive] = useState(false);

  return (
    <div className="bg-white min-h-[calc(100vh-60px)] flex flex-col p-4">
      {/* Top Container with Border */}
      <div className="border border-gray-300 rounded-[3px] bg-white flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-[#4F46E5] px-4 py-2 text-white">
          <h2 className="text-[14px] font-medium tracking-wide">Deleted Entry</h2>
        </div>

        {/* Filter Section */}
        <div className="p-3 border-b border-gray-300 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-end gap-6 w-full sm:w-auto">
            
            {/* Search by */}
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <div 
                  onClick={() => setSearchByActive(!searchByActive)}
                  className={cn(
                    "w-8 h-[16px] rounded-full relative cursor-pointer transition-colors duration-200 border border-gray-300",
                    searchByActive ? "bg-[#007bff]" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 bg-white rounded-full absolute top-[0px] shadow-sm transition-all duration-200",
                    searchByActive ? "right-[1px]" : "left-[1px]"
                  )}></div>
                </div>
                <label className="text-[13px] font-bold text-gray-800">Search by :</label>
              </div>
              <select className="w-full sm:w-[300px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-[#f8f9fa] appearance-none">
                <option></option>
              </select>
              <div className="relative -mt-6 right-2 pointer-events-none flex justify-end">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <div className="flex justify-between items-center w-full sm:w-[250px]">
                <label className="text-[13px] font-bold text-gray-800">Date</label>
                <span className="text-[12px] font-bold text-[#007bff]">(25-May-2026)</span>
              </div>
              <select className="w-full sm:w-[250px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-800 bg-white appearance-none">
                <option>Today</option>
              </select>
              <div className="relative -mt-6 right-2 pointer-events-none flex justify-end">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 h-[30px] rounded-[3px] text-[13px] font-medium transition-colors">
              Search
            </button>
          </div>

          {/* Permanently Delete Button */}
          <button className="bg-[#f06e7b] hover:bg-[#e45a68] text-white px-4 h-[30px] rounded-[3px] text-[13px] font-medium transition-colors">
            Permanently Delete
          </button>
        </div>

        {/* Table Area */}
        <div className="">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 bg-white">
                <th className="p-2 border-r border-gray-200 w-8 text-center whitespace-nowrap">
                  <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" />
                </th>
                <th className="p-2 border-r border-gray-200 text-left text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Date</th>
                <th className="p-2 border-r border-gray-200 text-left text-[12px] font-bold text-gray-800 w-[120px] whitespace-nowrap">Voucher No</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 whitespace-nowrap">Particular</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Voucher Type</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Debit</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[90px] whitespace-nowrap">Payment In</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Payment Out</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Discount</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Deleted On</th>
                <th className="p-2 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Restore</th>
              </tr>
            </thead>
            <tbody>
              {/* Totals Row */}
              <tr className="border-b border-gray-300 bg-white">
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">TOTAL</td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">0</td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">0</td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">0</td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">0</td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2"></td>
              </tr>
              {/* Empty Rows to fill space */}
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-200/50 bg-white h-[35px]">
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td className="border-r border-gray-200/50"></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
