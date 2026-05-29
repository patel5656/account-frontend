import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon, Plus } from 'lucide-react';

export function ProductMasterModal({ isOpen, onClose }) {
  const [isProduct, setIsProduct] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isGstApplicable, setIsGstApplicable] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full sm:max-w-[750px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5 w-[200px]">Product Master</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white font-bold text-[14px]">Product</span>
            <div 
              className={`w-[36px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isProduct ? 'bg-[#0056b3]' : 'bg-gray-300'}`}
              onClick={() => setIsProduct(!isProduct)}
            >
              <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isProduct ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
            </div>
            <span className="text-white text-[13px]">Service</span>
          </div>

          <div className="flex items-center w-[200px] justify-end">
            <button className="text-white hover:text-gray-200 focus:outline-none transition-colors px-3">
              <Settings className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
            <button 
              onClick={onClose} 
              className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
            >
              <X className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 bg-white">
          <div className="flex flex-col gap-4">
            
            {/* Row 1: Product Name */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">Product Name</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[14px] font-bold text-gray-800 select-none">Active</span>
                </div>
              </div>
              <input 
                type="text" 
                className="w-full border border-[#4F46E5] bg-[#e8e5ff] rounded-[3px] px-3 py-[6px] text-[14px] outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)]"
              />
            </div>

            {/* Row 2: Brand Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-bold text-gray-800">Brand Name</label>
              <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-600 bg-white">
                <option></option>
              </select>
            </div>

            {/* Row 3: Gst and HSN */}
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-gray-800">Gst</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isGstApplicable ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setIsGstApplicable(!isGstApplicable)}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isGstApplicable ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[13px] text-gray-600 select-none">Applicable : Yes</span>
                  </div>
                </div>
                <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-700 bg-white">
                  <option>@0 %</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">HSN</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Row 4: Table */}
            <div className="mt-1 border border-gray-200 rounded-[3px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] bg-[#f8f9fa] border-b border-gray-200 text-center">
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">Unit</div>
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">MRP</div>
                <div className="py-2 font-bold text-[14px] text-gray-800 border-r border-gray-200">Sale</div>
                <div></div>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] p-2 gap-2">
                <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white font-bold">
                  <option>pcs</option>
                </select>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[4px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
                <div></div>
              </div>
            </div>

            {/* Row 5: Units Master */}
            <div className="flex flex-wrap items-center gap-2">
              <select className="flex-1 border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-600 bg-white">
                <option></option>
              </select>
              <button className="bg-[#28a745] hover:bg-[#218838] px-3 py-[6px] rounded-[3px] flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
              </button>
              <button className="border border-[#4F46E5] text-[#4F46E5] hover:bg-gray-50 px-3 py-[6px] rounded-[3px] flex items-center gap-1.5 transition-colors font-medium text-[14px]">
                <Settings className="w-4 h-4" strokeWidth={2.5} />
                Units Master
              </button>
            </div>

            {/* Row 6: Toggles */}
            <div className="grid grid-cols-4 pt-2">
              {['More Info', 'Raw Materials', 'Sub Item', 'Sub Inventory'].map((label) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors bg-[#ced4da]">
                    <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm translate-x-[2px]"></div>
                  </div>
                  <span className="text-[12px] font-bold text-gray-800">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
          <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-[7px] rounded-[3px] transition-colors flex items-center justify-center">
            <ImageIcon className="w-[18px] h-[18px]" />
          </button>
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
