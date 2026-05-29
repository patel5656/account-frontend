import React, { useState } from 'react';

export function BrandwisePurchaseSummary() {
  const [selectedPeriod, setSelectedPeriod] = useState('Select');

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-3 flex flex-col relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-6 flex-wrap">
              {/* Select Period */}
              <div className="flex flex-col gap-1 w-full sm:max-w-[250px]">
                <label className="text-[13px] font-bold text-gray-800 px-1">Select Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
                >
                  <option>Select</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Quarter</option>
                  <option>Last Quarter</option>
                  <option>Custom Range</option>
                </select>
              </div>

              {/* Custom Range Date Inputs */}
              {selectedPeriod === 'Custom Range' && (
                <>
                  <div className="flex flex-col gap-1 w-full sm:max-w-[180px]">
                    <label className="text-[13px] font-bold text-gray-800 px-1">From Date</label>
                    <input
                      type="date"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full sm:max-w-[180px]">
                    <label className="text-[13px] font-bold text-gray-800 px-1">To Date</label>
                    <input
                      type="date"
                      className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
                    />
                  </div>
                </>
              )}

              {/* Party Name */}
              <div className="flex flex-col gap-1 w-full sm:max-w-[400px]">
                <div className="flex flex-wrap items-center gap-2 px-1">
                  <div className="w-[32px] h-[16px] bg-gray-300 rounded-full relative cursor-pointer border border-gray-400">
                    <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[1px] left-[1px]"></div>
                  </div>
                  <label className="text-[13px] font-bold text-gray-800">Party Name</label>
                </div>
                <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white">
                  <option>Select Name</option>
                </select>
              </div>
            </div>

            {/* Discount Type */}
            <div className="flex flex-col gap-1 w-full sm:max-w-[200px]">
              <label className="text-[13px] font-bold text-gray-800 px-1 text-right">Discount Type</label>
              <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
                <option>MRP</option>
              </select>
            </div>

          </div>
        </div>

        {/* Report Content */}
        <div className="p-4">
          <div className="w-full">
            {/* Title */}
            <div className="text-center mb-1">
              <h3 className="text-[14px] font-normal text-gray-600">Brandwise Purchase Summary</h3>
              <p className="text-[14px] font-bold text-gray-800">From 23-May-2026 to 23-May-2026</p>
            </div>

            {/* Table */}
            <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-800 mt-1">
              <thead>
                <tr>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[40px] text-center whitespace-nowrap">#</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 text-center whitespace-nowrap">Brand Name</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Quantity</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Amount</th>
                  <th className="border border-gray-800 text-[12px] font-bold text-gray-900 py-1.5 px-2 w-[120px] text-center whitespace-nowrap">Total Discount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 py-1.5 px-2 h-[28px]"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                </tr>
                <tr>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-4">
                    <span className="font-bold text-[13px] text-gray-900">Totals :</span>
                  </td>
                  <td className="border border-gray-800 py-1.5 px-2"></td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-2">
                    <span className="font-bold text-[13px] text-gray-900">0</span>
                  </td>
                  <td className="border border-gray-800 py-1.5 px-2 text-right pr-2">
                    <span className="font-bold text-[13px] text-gray-900">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

      </div>

    </div>
  );
}
