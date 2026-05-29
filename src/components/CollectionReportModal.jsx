import React from 'react';
import { 
  BarChart2, 
  X, 
  Calendar, 
  ShoppingCart, 
  Coins, 
  HandCoins,
  Calculator,
  Info
} from 'lucide-react';
import { cn } from '../utils';

export function CollectionReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded shadow-xl w-full max-w-[min(98vw,800px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 text-white">
            <BarChart2 className="w-5 h-5" strokeWidth={2.5} />
            <h2 className="text-[17px] font-medium tracking-wide">Collection Report</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4">
            <div>
              <label className="block text-[14px] font-bold text-gray-800 mb-1">Select Period</label>
              <select className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 w-full outline-none focus:border-[#4F46E5]">
                <option>Today</option>
              </select>
            </div>
            
            <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-2 bg-[#4F46E5] text-white px-3 py-1.5 rounded-[3px] shadow-sm">
              <Calendar className="w-4 h-4" />
              <span className="text-[14px] font-medium">23-May-2026</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Today's Sales */}
            <div className="bg-[#4F46E5] rounded-[3px] p-3 text-white flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <BarChart2 className="w-[14px] h-[14px]" strokeWidth={3} />
                  <span className="text-[14px] font-bold tracking-wide">Today's Sales</span>
                </div>
                <span className="text-[28px] font-bold leading-none">0</span>
              </div>
              <ShoppingCart className="w-10 h-10 text-white/90" strokeWidth={1.5} />
            </div>

            {/* Cash Sales */}
            <div className="bg-[#28a745] rounded-[3px] p-3 text-white flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <BanknoteIcon className="w-[14px] h-[14px]" strokeWidth={3} />
                  <span className="text-[14px] font-bold tracking-wide">Cash Sales</span>
                </div>
                <span className="text-[28px] font-bold leading-none">0</span>
              </div>
              <Coins className="w-10 h-10 text-white/90" strokeWidth={1.5} />
            </div>

            {/* Credit Sales */}
            <div className="bg-[#dc3545] rounded-[3px] p-3 text-white flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <CreditCardIcon className="w-[14px] h-[14px]" strokeWidth={3} />
                  <span className="text-[14px] font-bold tracking-wide">Credit Sales</span>
                </div>
                <span className="text-[28px] font-bold leading-none">0</span>
              </div>
              <HandCoins className="w-10 h-10 text-white/90" strokeWidth={1.5} />
            </div>
          </div>

          {/* Total Bar */}
          <div className="bg-[#28a745] text-white rounded-[3px] p-3 flex justify-between items-center shadow-sm mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Calculator className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[15px] font-bold tracking-wider">TOTAL COLLECTION</span>
            </div>
            <span className="text-[22px] font-bold">₹0</span>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-6 text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center mb-3">
              <Info className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <p className="text-[15px] font-medium">No sales or payment data found for selected date range</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-end">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[3px] text-[14px] transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={3} />
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

// Small inline icons for the card headers
const BanknoteIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
