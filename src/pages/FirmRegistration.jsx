import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';

export function FirmRegistration() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-45px)] flex flex-col">
      <div className="bg-white m-3 rounded shadow-sm border border-gray-200 flex-1 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-2">
          <h2 className="text-white font-medium text-[15px]">Firm Registration</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-[#dc3545] hover:text-red-700 bg-[#f8f9fa] rounded-sm p-0.5"
          >
            <X className="w-[18px] h-[18px] font-bold" strokeWidth={4} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* Firm Name */}
            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Firm Name</label>
              <input 
                type="text" 
                placeholder="Firm Name / Business Name" 
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5]"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Contact Number</label>
              <div className="relative">
                <select className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] appearance-none text-gray-400 bg-white">
                  <option value="">Hint - Better to use First Number as WhatsApp Number</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Address</label>
              <div className="relative">
                <select className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] appearance-none text-gray-400 bg-white">
                  <option value="">Hint - Multiple Address Lines on Invoices can be Possible</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* State */}
            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">State</label>
              <div className="relative">
                <select className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] appearance-none text-gray-400 bg-white">
                  <option value="">Select State</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Gstin */}
            <div>
              <div className="flex items-center justify-between mb-1">
                 <label className="block text-[13px] font-bold text-gray-800">Gstin</label>
                 <div className="flex flex-wrap items-center gap-2">
                   <div className="w-8 h-[18px] bg-gray-300 rounded-full relative cursor-pointer">
                     <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
                   </div>
                   <span className="text-[12px] font-bold text-gray-800">Gst Registred</span>
                 </div>
              </div>
              <input 
                type="text" 
                placeholder="Enter Gst Number" 
                disabled
                className="w-full min-w-0 border border-gray-300 bg-gray-100 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none cursor-not-allowed text-gray-400"
              />
            </div>

            {/* Empty column for grid alignment */}
            <div className="hidden md:block"></div>

            {/* More Information */}
            <div className="col-span-1 md:col-span-2 pt-2">
               <div className="flex flex-wrap items-center gap-2">
                 <div className="w-8 h-[18px] bg-gray-300 rounded-full relative cursor-pointer">
                   <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
                 </div>
                 <span className="text-[12px] font-bold text-gray-800">More Information</span>
               </div>
            </div>
            
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-between items-center">
          <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-5 py-1.5 rounded-[3px] transition-colors border border-transparent">
            Update
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white hover:bg-gray-50 text-gray-700 text-[13px] font-medium px-5 py-1.5 rounded-[3px] min-w-0 border border-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
