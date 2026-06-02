import React from 'react';
import { useNavigate } from 'react-router-dom';

export function TradingAccount() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1 p-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-[18px] font-medium text-gray-700 mb-4">Trading Account</h2>
          
          {/* Date Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
            <div className="flex flex-col items-start gap-1">
              <label className="text-[13px] font-bold text-gray-800">From Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2026-05-24"
                  className="h-[32px] w-[140px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600 bg-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <label className="text-[13px] font-bold text-gray-800">To Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2026-05-24"
                  className="h-[32px] w-[140px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end h-full">
               <div className="h-[21px]"></div> {/* Spacer to align button with inputs */}
               <button className="h-[32px] px-4 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm">
                 Show Report
               </button>
            </div>
          </div>

          <p className="text-[14px] font-bold text-[#4F46E5]">(From: 24-May-2026 - To: 24-May-2026)</p>
        </div>

        {/* Two-Column Ledger Table */}
        <div className="border border-gray-200 rounded-[3px] overflow-hidden mb-6">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[35%] whitespace-nowrap">Particular</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[15%] text-center border-r border-gray-200 whitespace-nowrap">Amount</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[35%] whitespace-nowrap">Particular</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[15%] text-center whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[14px] text-gray-900 mb-1">Net Sale</div>
                  <div className="text-[12px] text-gray-500">Sales : 0</div>
                  <div className="text-[12px] text-gray-500">Sales Return : 0</div>
                </td>
                <td className="py-4 px-4 align-top text-center font-bold text-[13px] border-r border-gray-200">0</td>
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[14px] text-gray-900">Opening Stock</div>
                </td>
                <td className="py-4 px-4 align-top text-center font-bold text-[13px]">0</td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[14px] text-gray-900">Closing Stock</div>
                </td>
                <td className="py-4 px-4 align-top text-center font-bold text-[13px] border-r border-gray-200">0</td>
                <td className="py-4 px-4 align-top">
                  <div className="font-bold text-[14px] text-gray-900 mb-1">Net Purchase</div>
                  <div className="text-[12px] text-gray-500">Purchase : 0</div>
                  <div className="text-[12px] text-gray-500">Purchase Return : 0</div>
                </td>
                <td className="py-4 px-4 align-top text-center font-bold text-[13px]">0</td>
              </tr>
              {/* TOTAL Row */}
              <tr>
                <td className="py-4 px-4 align-middle">
                  <div className="font-bold text-[14px] text-gray-900 uppercase">TOTAL</div>
                </td>
                <td className="py-4 px-4 align-middle text-center font-bold text-[13px] border-r border-gray-200">0</td>
                <td className="py-4 px-4 align-middle">
                  <div className="font-bold text-[14px] text-gray-900 uppercase">TOTAL</div>
                </td>
                <td className="py-4 px-4 align-middle text-center font-bold text-[13px]">0</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        {/* Gross Profit Badge */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#28a745] text-white px-4 py-2 font-medium text-[14px] rounded shadow-sm inline-block">
            GROSS Profit : 0
          </div>
        </div>

      </div>

      {/* Footer Button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/90 border-t border-gray-200 p-3 flex justify-end">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
      </div>

    </div>
  );
}
