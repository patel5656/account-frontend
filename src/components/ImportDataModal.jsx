import React from 'react';
import { X, FileDown } from 'lucide-react';

export function ImportDataModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-xl w-full sm:max-w-[650px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] pl-4 pr-0 flex items-center justify-between h-[45px]">
          <h2 className="text-[15px] text-white font-medium">Import Data</h2>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] text-white h-full px-3.5 hover:bg-[#c82333] transition-colors flex items-center justify-center"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex-1 bg-white">
          
          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">Import From :</label>
            <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[#4F46E5]/20 transition-all">
              <option>Excel (.xlsx)</option>
            </select>
          </div>

          <p className="text-[13px] text-gray-600 mb-4">Note : Please Select one of the Following.</p>

          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">Import Type :</label>
            <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[#4F46E5]/20 transition-all">
              <option></option>
            </select>
          </div>

          <div className="flex border border-gray-300 rounded-[3px] overflow-hidden mb-6">
            <div className="flex-1 px-3 py-[7px] text-[14px] text-gray-500 bg-white border-r border-gray-300 flex items-center">
              Select Import File (File Type : CSV)
            </div>
            <button className="bg-[#e9ecef] border-l border-gray-300 px-4 py-[7px] text-[14px] text-gray-700 hover:bg-[#dde2e6] transition-colors">
              Browse
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 sm:px-5">
          <button className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[14px] transition-colors shadow-sm focus:ring-[3px] focus:ring-[#4F46E5]/50 outline-none">
            <FileDown className="w-[14px] h-[14px]" strokeWidth={2.5} />
            Import from Excel
          </button>
        </div>

      </div>
    </div>
  );
}
