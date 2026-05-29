import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Printer, Calendar, Paperclip, PlusSquare, Plus } from 'lucide-react';
import { cn } from '../utils';

// Inline Youtube SVG
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

export function IncomeLedgerInput() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Income Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-white p-1 rounded-sm shadow-sm transition-colors">
              <YoutubeIcon className="w-5 h-5 text-[#ff0000]" />
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors ml-1"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={4} />
            </button>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 max-w-full">
            
            <div className="flex flex-col gap-1 w-full max-w-[min(92vw,500px)]">
               <div className="flex justify-between items-center px-1">
                 <label className="text-[13px] font-bold text-gray-800">Incomes Name</label>
                 <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
               </div>
               <select className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] rounded-[3px] px-3 py-1.5 text-[14px] outline-none appearance-none font-medium">
                 <option>Select Name</option>
               </select>
            </div>

            <div className="flex flex-wrap items-center gap-2 pb-1.5">
               <span className="text-[13px] font-bold text-gray-800">Account-wise</span>
               <div className="w-[36px] h-[20px] bg-[#4F46E5] rounded-full relative cursor-pointer shadow-inner">
                 <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[3px] left-[3px] shadow-sm"></div>
               </div>
               <span className="text-[13px] text-gray-500">Date-wise</span>
            </div>

          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 w-full">
          <div className="min-w-[900px] flex flex-col h-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] text-center border-b border-gray-600">
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
                Income Amount
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Paid Amount
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Discount
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Balance
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40] text-white text-[13px] font-bold">
                #
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
                <button className="bg-[#28a745] hover:bg-[#218838] flex items-center justify-center w-[26px] h-[26px] rounded-[2px]">
                  <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 p-2"></div>
              <div className="border-r border-gray-200 p-2"></div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-gray-800">Total :</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="p-2"></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
