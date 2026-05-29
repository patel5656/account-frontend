import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, X, Calendar, Search, Info } from 'lucide-react';
import { cn } from '../utils';

export function AllBookBalance() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Cash & Bank Report</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
              <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
              Today's Collection
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Date Filter Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex justify-between items-center mb-1 max-w-[min(96vw,600px)]">
             <label className="text-[13px] font-bold text-gray-800">Today's Date</label>
             <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
          </div>
          
          <div className="flex items-center max-w-[min(96vw,600px)]">
             <input 
               type="text" 
               readOnly
               value="23-05-2026"
               className="flex-1 h-[34px] border border-gray-300 border-r-0 rounded-l-[3px] px-3 text-[13px] outline-none text-gray-600 bg-white"
             />
             <div className="h-[34px] border border-gray-300 border-l-0 px-3 flex items-center justify-center text-gray-500 bg-white border-r-0">
               <Calendar className="w-4 h-4" />
             </div>
             <button className="h-[34px] bg-[#007bff] hover:bg-[#0069d9] text-white px-3 border border-[#007bff] rounded-r-[3px] flex items-center justify-center transition-colors">
               <Search className="w-[18px] h-[18px]" strokeWidth={3} />
             </button>
          </div>
        </div>

        {/* Balance Cards Header */}
        <div className="grid grid-cols-4 text-center border-b border-gray-200 bg-white">
           <div className="py-2.5 font-bold text-[13px] text-[#007bff] border-r border-gray-200">
             Cash Balance
           </div>
           <div className="py-2.5 font-bold text-[13px] text-[#007bff] border-r border-gray-200">
             Bank Balance
           </div>
           <div className="py-2.5 font-bold text-[13px] text-[#007bff] border-r border-gray-200">
             Wallet Balance
           </div>
           <div className="py-2.5 font-bold text-[13px] text-[#007bff]">
             Loan Balance
           </div>
        </div>

        {/* Balance Cards Values */}
        <div className="grid grid-cols-4 text-center border-b border-gray-200 bg-white p-3 gap-3">
           <div className="bg-[#28a745] text-white font-bold text-[15px] py-1.5 rounded-[3px] shadow-sm">
             0
           </div>
           <div className="bg-[#007bff] text-white font-bold text-[15px] py-1.5 rounded-[3px] shadow-sm">
             0
           </div>
           <div className="bg-[#dc3545] text-white font-bold text-[15px] py-1.5 rounded-[3px] shadow-sm">
             0
           </div>
           <div className="bg-[#ffc107] text-white font-bold text-[15px] py-1.5 rounded-[3px] shadow-sm">
             0
           </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-500 bg-white shadow-[inset_0_4px_6px_-6px_rgba(0,0,0,0.1)]">
          <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center mb-4">
            <Info className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <p className="text-[14px] font-medium text-gray-600">No bank data available for the selected date.</p>
        </div>

      </div>
    </div>
  );
}
