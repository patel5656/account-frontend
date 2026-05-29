import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Printer, Calendar, Paperclip, PlusSquare, Filter, FileDown } from 'lucide-react';

export function CompanyLedger() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Company Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => alert('Filtering data...')}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={() => alert('Exporting data...')}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors"
            >
              <FileDown className="w-4 h-4" strokeWidth={2.5} />
              Export
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 border-b border-gray-200 flex flex-col gap-3">
          <div className="flex flex-col gap-1 w-full md:w-1/2">
             <div className="flex justify-between items-center px-1">
               <label className="text-[13px] font-bold text-gray-800">Company Name</label>
               <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
             </div>
             <select className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] rounded-[3px] px-3 py-1.5 text-[14px] outline-none font-medium">
               <option>Select Name</option>
             </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full">
             <select className="w-full sm:w-[40%] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none text-gray-600 bg-white">
               <option>Voucher No</option>
             </select>
             <input type="text" placeholder="Search for Voucher No" className="w-full sm:w-[60%] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none text-gray-600 placeholder-gray-400" />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 w-full">
          <div className="min-w-[900px] flex flex-col h-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                #
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                DATE
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Other Information
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Voucher No
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Bill Amount
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center gap-1.5">
                <div className="w-[30px] h-[16px] bg-[#dc3545] rounded-full relative cursor-pointer border border-[#c82333]">
                  <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[1px] left-[1px]"></div>
                </div>
                Payment Out
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Dis.
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Balance
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40]">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span className="text-white text-[12px] font-bold ml-1">#</span>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input 
                  type="text" 
                  readOnly
                  value="23-05-2026"
                  className="w-full h-[32px] border border-gray-300 border-r-0 rounded-l-[3px] px-2 text-[13px] outline-none text-gray-600"
                />
                <div className="h-[32px] border border-gray-300 border-l-0 px-2 flex items-center justify-center rounded-r-[3px] text-gray-500">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                 <input type="text" placeholder="Enter Other Information" className="w-full h-[32px] px-2 text-[13px] outline-none text-center placeholder-gray-400" />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" className="w-full h-[32px] px-2 text-[13px] outline-none" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center bg-[#e9ecef]">
                <input type="text" value="0" className="w-full h-[32px] bg-transparent text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="bg-[#343a40] flex items-center justify-center gap-1.5 p-1">
                <button className="bg-white p-1 rounded-sm shadow-sm hover:bg-gray-100">
                  <Paperclip className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                </button>
                <button className="text-[#28a745] hover:text-green-400">
                  <PlusSquare className="w-6 h-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] bg-white border-b border-gray-200 mt-auto">
              <div className="col-span-4 border-r border-gray-200 p-2 flex items-center justify-end">
                <span className="font-bold text-[14px] text-gray-800">Total</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="p-2 flex items-center justify-center">
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
