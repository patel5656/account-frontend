import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, PlusSquare, Plus } from 'lucide-react';

export function BankLedger() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Bank Book</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-[#dc3545] hover:text-red-700 bg-[#f8f9fa] rounded-sm p-0.5 transition-colors"
          >
            <X className="w-5 h-5 font-bold" strokeWidth={4} />
          </button>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex flex-col gap-1 max-w-[min(92vw,500px)]">
             <div className="flex justify-between items-center px-1">
               <label className="text-[13px] font-bold text-gray-800">From Cash/Bank</label>
               <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
             </div>
             <select className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] rounded-[3px] px-3 py-1.5 text-[14px] outline-none font-medium">
               <option>Enter Bank Name Or UPI Name</option>
             </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[60px_130px_1fr_150px_120px_150px_60px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex flex-col justify-center items-center">
                S.NO.
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Date
              </div>
              <div className="border-r border-gray-600 py-2.5 px-4 text-[13px] font-bold flex items-center justify-between">
                <span>To Cash/Bank</span>
                <span className="text-[#28a745]">Account Balance : 0</span>
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Payment Transfer
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Bank Charges
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Other Info
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                Action
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[60px_130px_1fr_150px_120px_150px_60px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40]">
                <span className="text-white text-[12px] font-bold">#</span>
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
                 <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-500 bg-white">
                   <option>Enter Bank Name Or UPI Name</option>
                 </select>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" placeholder="Enter Other" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none" />
              </div>
              <div className="bg-[#343a40] flex items-center justify-center p-1">
                <button className="bg-[#28a745] hover:bg-[#218838] flex items-center justify-center w-[26px] h-[26px] rounded-[2px]">
                  <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
