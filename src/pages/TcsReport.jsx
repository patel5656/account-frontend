import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export function TcsReport() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header Title */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700">TCS Report</h2>
        </div>

        <div className="p-4">
          {/* Controls Row */}
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div className="flex flex-col gap-1.5 w-full sm:max-w-[250px]">
              <label className="text-[13px] font-bold text-gray-800">Select Period</label>
              <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                <option>Select</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:max-w-[300px]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#007bff]"></div>
                </div>
                <label className="text-[13px] font-bold text-gray-800">Party Name</label>
              </div>
              <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white" disabled>
                <option>Select Name</option>
              </select>
            </div>

            <button className="h-[32px] px-5 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm mb-px">
              Search
            </button>
          </div>

          {/* Table */}
          <div className="w-full">
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-black text-left">
              <thead>
                <tr>
                  <th className="py-2.5 px-3 border border-black text-[12px] font-bold text-gray-800 text-center leading-tight whitespace-nowrap">Date<br/>Invoice No.</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Party Name</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Voucher Type</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">Invoice Value</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">TCS Collected</th>
                  <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center whitespace-nowrap">TCS Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2.5 px-3 border border-black text-[13px]"></td>
                  <td className="py-2.5 px-3 border border-black text-[13px]"></td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">Total</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                  <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-transparent p-3 flex justify-end gap-2 pr-6">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#dc3545] hover:bg-[#c82333] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
        <button className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 11H7v2h3v3l4-4-4-4v3zM22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-2 0c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8 8 3.59 8 8z"/></svg>
        </button>
        <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors">
          <Upload className="w-4 h-4" /> Export
        </button>
      </div>

    </div>
  );
}
