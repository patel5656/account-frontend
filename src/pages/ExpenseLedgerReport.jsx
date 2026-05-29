import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { cn } from '../utils';

export function ExpenseLedgerReport() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Expense Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => navigate('/admin/expenses-ledger/expense_ledger')}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors ml-1"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={4} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-6 max-w-[800px]">
             
             {/* Expenses Head */}
             <div className="flex-1 flex flex-col gap-1">
               <label className="text-[13px] font-bold text-gray-800">Expenses Head</label>
               <input 
                 type="text" 
                 list="expense-heads"
                 placeholder="Select or Search Name..." 
                 className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] placeholder-[#0056b3]/70 rounded-[3px] px-3 py-1.5 text-[13px] outline-none font-medium focus:border-blue-400"
               />
               <datalist id="expense-heads">
                 <option value="Office Rent" />
                 <option value="Electricity Bill" />
                 <option value="Internet Bill" />
                 <option value="Stationery" />
                 <option value="Tea & Coffee" />
                 <option value="Petrol/Travel" />
                 <option value="Staff Salary" />
               </datalist>
             </div>

             {/* Date */}
             <div className="flex-1 flex flex-col gap-1">
               <div className="flex justify-between items-center">
                 <label className="text-[13px] font-bold text-gray-800">Date</label>
                 <span className="text-[13px] font-bold text-[#4F46E5]">(29-May-2026)</span>
               </div>
               <div className="relative">
                 <select className="w-full min-w-0 border border-gray-300 bg-white text-gray-700 rounded-[3px] pl-3 pr-8 py-1.5 text-[13px] outline-none appearance-none cursor-pointer hover:border-gray-400">
                   <option>Today</option>
                   <option>Yesterday</option>
                   <option>Last 7 Days</option>
                   <option>Last 30 Days</option>
                   <option>Last Month</option>
                   <option>This Month</option>
                   <option>Custom Range</option>
                 </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                   </svg>
                 </div>
               </div>
             </div>

          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 w-full">
          <div className="min-w-[900px] flex flex-col h-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[80px_130px_1fr_120px_120px_120px_100px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-3 text-[13px] font-bold flex items-center justify-center">
                S.NO.
              </div>
              <div className="border-r border-gray-600 py-3 text-[13px] font-bold flex items-center justify-center uppercase">
                Date
              </div>
              <div className="border-r border-gray-600 py-3 text-[13px] font-bold flex items-center justify-center uppercase">
                Expenses Details
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold leading-tight flex flex-col justify-center items-center uppercase">
                Expense<br/>Amount
              </div>
              <div className="border-r border-gray-600 py-3 text-[13px] font-bold flex items-center justify-center uppercase">
                Paid
              </div>
              <div className="border-r border-gray-600 py-3 text-[13px] font-bold flex items-center justify-center uppercase">
                Balance
              </div>
              <div className="py-3 text-[13px] font-bold flex items-center justify-center uppercase">
                Action
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-[80px_130px_1fr_120px_120px_120px_100px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 p-3"></div>
              <div className="border-r border-gray-200 p-3"></div>
              <div className="border-r border-gray-200 p-3 flex items-center justify-center">
                 <span className="text-[14px] font-bold text-gray-800">GRAND TOTAL</span>
              </div>
              <div className="border-r border-gray-200 p-3 flex items-center justify-center">
                 <span className="text-[14px] font-bold text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-3 flex items-center justify-center">
                 <span className="text-[14px] font-bold text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-3 flex items-center justify-center">
                 <span className="text-[14px] font-bold text-gray-800">0</span>
              </div>
              <div className="p-3"></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
