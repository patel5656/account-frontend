import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function DayBookSummary() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-[calc(100vh-45px)] p-6 relative pb-16">
      
      {/* Title */}
      <h1 className="text-[22px] font-bold text-[#0d1c2f] text-center mb-6">
        DAY BOOK SUMMARY
      </h1>

      {/* Filter Section 1 */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <span className="text-[14px] font-bold text-gray-800">Date Type:</span>
          
          <div className="flex flex-wrap items-center gap-1.5 cursor-pointer">
            <input type="radio" checked readOnly className="w-4 h-4 text-blue-500 accent-blue-500" />
            <span className="text-[14px] font-bold text-[#007bff]">Transaction Date</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 cursor-pointer ml-2">
            <input type="radio" disabled className="w-4 h-4" />
            <span className="text-[14px] text-gray-600">Modified Date</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-4">
            <div className="w-[36px] h-[20px] bg-[#d6d8db] rounded-full relative cursor-pointer">
              <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[3px] left-[3px] shadow-sm"></div>
            </div>
            <span className="text-[14px] font-bold text-gray-800">With Items</span>
          </div>
        </div>

        <p className="text-[12px] text-gray-500 mb-6">
          <span className="font-bold">Transaction Date:</span> Filter by the date when the transaction occurred. <span className="font-bold">Modified Date:</span> Filter by the date when the transaction was last updated.
        </p>
      </div>

      {/* Filter Section 2 */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
        
        {/* Search by Voucher Type */}
        <div className="flex-1 max-w-[300px]">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="w-[36px] h-[20px] bg-[#d6d8db] rounded-full relative cursor-pointer">
              <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[3px] left-[3px] shadow-sm"></div>
            </div>
            <span className="text-[14px] font-bold text-gray-800">Search by Voucher Type :</span>
          </div>
          <select className="w-full min-w-0 border border-gray-300 bg-gray-50 rounded-[3px] px-3 py-1.5 text-[14px] outline-none text-gray-700">
            <option></option>
          </select>
        </div>

        {/* Transaction Date */}
        <div className="flex-1 max-w-[300px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[14px] font-bold text-gray-800">Transaction Date :</span>
            <span className="text-[13px] font-bold text-[#4F46E5]">(23-May-2026)</span>
          </div>
          <select className="w-full min-w-0 border border-gray-300 bg-white rounded-[3px] px-3 py-1.5 text-[14px] outline-none text-gray-800 font-medium">
            <option>Today</option>
          </select>
        </div>

        {/* Search Button */}
        <div>
          <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded-[3px] flex items-center gap-1.5 text-[14px] font-bold transition-colors shadow-sm">
            <Search className="w-4 h-4" strokeWidth={2.5} />
            Search
          </button>
        </div>

      </div>

      {/* Data Table */}
      <div className="border border-gray-200 rounded-sm">
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-[80px_100px_1fr_120px_100px_100px_100px_80px_80px] bg-white text-gray-800 border-b border-gray-200">
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Date</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Voucher No</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Particular</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Voucher Type</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Debit</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Payment In</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Payment Out</div>
            <div className="border-r border-gray-200 py-2.5 px-2 text-[13px] font-bold text-center">Discount</div>
            <div className="py-2.5 px-2 text-[13px] font-bold text-center">Action</div>
          </div>

          {/* Empty Row */}
          <div className="grid grid-cols-[80px_100px_1fr_120px_100px_100px_100px_80px_80px] bg-white border-b border-gray-200 h-[38px]">
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div></div>
          </div>

          {/* Total Row */}
          <div className="grid grid-cols-[80px_100px_1fr_120px_100px_100px_100px_80px_80px] bg-white">
            <div className="border-r border-gray-200 py-2 px-2"></div>
            <div className="border-r border-gray-200 py-2 px-2"></div>
            <div className="border-r border-gray-200 py-2 px-2"></div>
            <div className="border-r border-gray-200 py-2 px-2 text-[13px] font-bold text-center">TOTAL</div>
            <div className="border-r border-gray-200 py-2 px-2 text-[13px] font-bold text-center">0</div>
            <div className="border-r border-gray-200 py-2 px-2 text-[13px] font-bold text-center">0</div>
            <div className="border-r border-gray-200 py-2 px-2 text-[13px] font-bold text-center">0</div>
            <div className="border-r border-gray-200 py-2 px-2 text-[13px] font-bold text-center">0</div>
            <div className="py-2 px-2"></div>
          </div>
        </div>
      </div>

      {/* Bottom Go Back Button */}
      <div className="pt-4 flex justify-end">
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
