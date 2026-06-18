import React, { useState } from 'react';
import { X } from 'lucide-react';

export function IncomeMasterModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(96vw,600px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Incomes Master</h2>
          <button 
            onClick={onClose} 
            className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-bold text-gray-800">Income Name</label>
              <div className="flex flex-wrap items-center gap-2">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[13px] font-bold text-gray-800 select-none w-[50px]">{isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            <input 
              type="text" 
              placeholder="Enter Income Name"
              className="w-full border border-[#4F46E5] bg-[#e8e5ff] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
