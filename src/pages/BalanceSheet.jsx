import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BalanceSheet() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative pb-[70px]">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1 p-4">
        
        {/* Date Controls */}
        <div className="flex flex-col items-center justify-center gap-1 mb-6">
          <div className="flex flex-wrap items-end justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <label className="text-[13px] font-bold text-gray-800">Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2026-05-24"
                  className="h-[32px] w-[140px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600 bg-white text-center"
                />
              </div>
            </div>

            <button className="h-[32px] px-4 bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm">
              Show Report
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center mb-4">
          <h2 className="text-[14px] text-gray-700 uppercase mb-1 tracking-wide">BALANCE SHEET</h2>
          <p className="text-[13px] text-gray-600">( on Date 24-May-2026)</p>
        </div>

        {/* Balance Sheet Table */}
        <div className="border border-gray-200 rounded-sm overflow-hidden mb-6 mx-2">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse text-left table-fixed min-w-[500px]">
            <thead>
              <tr>
                <th className="py-2.5 px-4 text-[13px] font-bold text-white bg-[#4F46E5] border border-white text-center w-[35%] uppercase tracking-wide whitespace-nowrap">LIABILITIES</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-white bg-[#4F46E5] border border-white text-center w-[15%] whitespace-nowrap">Amount</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-white bg-[#4F46E5] border border-white text-center w-[35%] uppercase tracking-wide whitespace-nowrap">ASSETS</th>
                <th className="py-2.5 px-4 text-[13px] font-bold text-white bg-[#4F46E5] border border-white text-center w-[15%] whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Company Due</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Customer Due</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Loan Taken</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Loan Given</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Expenses Due</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Expenses Advance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Employee Salary Due</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Employee Advance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Stock</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 6 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Cash Balance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 7 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Bank Balance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 8 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Wallet Balance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              {/* Row 9 */}
              <tr>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center"></td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-700">Loan Balance</td>
                <td className="py-2.5 px-3 border border-gray-200 text-[13px] text-gray-800 text-center">0</td>
              </tr>
              
              {/* TOTAL Row */}
              <tr>
                <td className="py-3 px-3 border border-gray-200 text-[13px] font-bold text-gray-900 text-center tracking-wide uppercase">TOTAL LIABILITY</td>
                <td className="py-3 px-3 border border-gray-200 text-[13px] font-bold text-gray-900 text-center">0</td>
                <td className="py-3 px-3 border border-gray-200 text-[13px] font-bold text-gray-900 text-center tracking-wide uppercase">TOTAL ASSETS</td>
                <td className="py-3 px-3 border border-gray-200 text-[13px] font-bold text-gray-900 text-center">0</td>
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
