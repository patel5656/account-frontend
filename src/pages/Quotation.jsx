import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Printer, 
  Plus, 
  X, 
  Search,
  ArrowDownAZ
} from 'lucide-react';
import { CollectionReportModal } from '../components/CollectionReportModal';
import { LoadingSheetModal } from '../components/LoadingSheetModal';

export function Quotation() {
  const navigate = useNavigate();
  const [isCollectionReportModalOpen, setIsCollectionReportModalOpen] = useState(false);
  const [isLoadingSheetModalOpen, setIsLoadingSheetModalOpen] = useState(false);

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Quotation Summary</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setIsCollectionReportModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
              Today's Collection
            </button>
            <button 
              onClick={() => setIsLoadingSheetModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors"
            >
              <Printer className="w-4 h-4" strokeWidth={2.5} />
              Loading Sheet
            </button>
            <button 
              onClick={() => navigate('/admin/quotation-invoice')}
              className="flex items-center gap-1.5 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div className="w-8 h-[18px] bg-gray-300 rounded-full relative cursor-pointer flex items-center">
                <div className="w-[14px] h-[14px] bg-white rounded-full absolute left-[2px] shadow-sm"></div>
              </div>
              <span className="text-[13px] font-bold text-gray-800">Customer Name</span>
            </div>
            <select className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-500 outline-none focus:border-[#4F46E5] appearance-none bg-white">
              <option>Select Name</option>
            </select>
          </div>

          <div className="flex flex-wrap items-end gap-2 w-full md:w-auto">
             <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[13px] font-bold text-gray-800 invisible">Date</span>
                   <span className="text-[11px] font-bold text-[#4F46E5]">(23-May-2026)</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-800">Date</span>
                   <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white">
                     <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                   </select>
                </div>
             </div>

             <button className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white px-3 py-1.5 rounded-[3px] text-[14px] transition-colors shadow-sm h-[34px]">
               <Search className="w-4 h-4" strokeWidth={3} />
               Search
             </button>

             <button className="flex items-center justify-center bg-[#6c757d] hover:bg-[#5a6268] text-white px-2.5 py-1.5 rounded-[3px] transition-colors shadow-sm h-[34px]">
               <ArrowDownAZ className="w-[18px] h-[18px]" strokeWidth={2.5} />
             </button>
          </div>
        </div>

        {/* Totals Table Header */}
        <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-3 text-center py-2 px-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL AMT:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">0</span>
          </div>
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL PAID:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">0</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-bold tracking-wider">BALANCE:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">0</span>
          </div>
        </div>

        {/* Empty Area for table body */}
        <div className="flex-1 bg-white">
          {/* Table rows would go here */}
        </div>

      </div>
      <CollectionReportModal 
        isOpen={isCollectionReportModalOpen} 
        onClose={() => setIsCollectionReportModalOpen(false)} 
      />
      <LoadingSheetModal
        isOpen={isLoadingSheetModalOpen}
        onClose={() => setIsLoadingSheetModalOpen(false)}
      />
    </div>
  );
}
