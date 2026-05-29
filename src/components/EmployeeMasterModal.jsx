import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export function EmployeeMasterModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(true);
  const [isSalaryMonth, setIsSalaryMonth] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(96vw,700px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Employee Master</h2>
          <button 
            onClick={onClose} 
            className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          <div className="flex flex-col gap-4">
            
            {/* Row 1: Employee Name */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-gray-800">Employee Name</label>
                <div className="flex flex-wrap items-center gap-2">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Enter Employee Name"
                className="w-full border border-[#4F46E5] bg-[#e8e5ff] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold"
              />
            </div>

            {/* Row 2: Mobile Number, City */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Mobile Number</label>
                <input 
                  type="text" 
                  placeholder="Enter Mobile Number"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">City</label>
                <input 
                  type="text" 
                  placeholder="Enter City"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Row 3: Joining Date, Designation, Salary */}
            <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Joining Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="25-05-2026"
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-700"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Designation</label>
                <input 
                  type="text" 
                  placeholder="Enter Designation"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-gray-800">Salary</label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[12px] font-bold text-gray-800">Day</span>
                    <div 
                      className={`w-[28px] h-[14px] rounded-full relative cursor-pointer transition-colors ${isSalaryMonth ? 'bg-[#4F46E5]' : 'bg-gray-300'}`}
                      onClick={() => setIsSalaryMonth(!isSalaryMonth)}
                    >
                      <div className={`w-[12px] h-[12px] bg-gray-800 rounded-full absolute top-[1px] shadow-sm transition-transform ${isSalaryMonth ? 'translate-x-[14px]' : 'translate-x-[1px]'}`}></div>
                    </div>
                    <span className="text-[12px] text-gray-500">Month</span>
                  </div>
                </div>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Row 4: Paid Holiday, Commission, Special Commission */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Paid Holiday</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Commission</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Special Commission</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Row 5: Total Sale Commission, Commission on Manufacturing */}
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Total Sale Commission</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-gray-800">Commision on Manufacturing</label>
                <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[6px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-600 bg-white">
                  <option>NO</option>
                  <option>YES</option>
                </select>
              </div>
              <div></div> {/* Empty column for alignment */}
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
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
