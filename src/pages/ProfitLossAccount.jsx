import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ProfitLossAccount() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1 p-4">
        
        {/* Header & Date Controls */}
        <div className="text-center mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2026-05-24"
                className="h-[32px] w-[140px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600 bg-white"
              />
            </div>
            
            <div className="relative">
              <input 
                type="date" 
                defaultValue="2026-05-24"
                className="h-[32px] w-[140px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600 bg-white"
              />
            </div>

            <button className="h-[32px] px-4 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm">
              Show Report
            </button>
          </div>

          <h2 className="text-[14px] text-gray-700 mb-1">PROFIT AND LOSS REPORT</h2>
          <p className="text-[14px] text-gray-600">(From 24-May-2026 To 24-May-2026)</p>
        </div>

        {/* Ledger Table */}
        <div className="border border-gray-200 rounded-[3px] overflow-hidden mb-6">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[60%] whitespace-nowrap">Particular</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[20%] text-center whitespace-nowrap">Sub Total</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-gray-800 w-[20%] text-center whitespace-nowrap">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Row: Net Sales */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4">
                  <div className="text-[13px] text-gray-800 mb-0.5">Net Sales</div>
                  <div className="text-[12px] text-gray-500">Sales : 0</div>
                  <div className="text-[12px] text-gray-500">Sales Return : 0</div>
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-medium">0</td>
              </tr>
              
              {/* Row: Cost of goods Sold */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-[13px] text-gray-800">
                  Cost of goods Sold
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-medium">0</td>
              </tr>

              {/* Row: Gross Profit */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right text-[13px] font-bold text-[#28a745]">
                  Gross Profit
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-[#28a745]">0</td>
              </tr>

              {/* Row: Operating Expenses */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 font-bold text-[14px] text-gray-900" colSpan="3">
                  Operating Expenses
                </td>
              </tr>

              {/* Row: Total Operating Expenses */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right text-[13px] font-bold text-[#dc3545]">
                  Total Operating Expenses
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-[#dc3545]">0</td>
              </tr>

              {/* Row: Total Operating Income */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right text-[13px] font-bold text-gray-800">
                  Total Operating Income
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-gray-800">0</td>
              </tr>

              {/* Row: Other Incomes */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 font-bold text-[14px] text-gray-900" colSpan="3">
                  Other Incomes
                </td>
              </tr>

              {/* Row: Total Other Incomes */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right text-[13px] font-bold text-[#28a745]">
                  Total Other Incomes
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-[#28a745]">0</td>
              </tr>

              {/* Row: Other Expenses */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 font-bold text-[14px] text-gray-900" colSpan="3">
                  Other Expenses
                </td>
              </tr>

              {/* Row: Total Other Expenses */}
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-right text-[13px] font-bold text-[#dc3545]">
                  Total Other Expenses
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-[#dc3545]">0</td>
              </tr>

              {/* Row: Net Income */}
              <tr>
                <td className="py-3 px-4 text-right text-[13px] font-bold text-[#28a745]">
                  Net Income
                </td>
                <td className="py-3 px-4 text-center text-[13px]"></td>
                <td className="py-3 px-4 text-center text-[13px] font-bold text-[#28a745]">0</td>
              </tr>

            </tbody>
          </table>
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
