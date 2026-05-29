import React, { useState } from 'react';
import { X } from 'lucide-react';

export function CashBankMasterModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(true);
  const [bookName, setBookName] = useState('');
  const [type, setType] = useState('CASH BOOK');

  const handleSubmit = () => {
    if (bookName.trim() !== '') {
      window.dispatchEvent(new CustomEvent('bankAdded', { 
        detail: { id: Date.now(), name: bookName, type: type, balance: 0 } 
      }));
    }
    setBookName('');
    setType('CASH BOOK');
    setIsActive(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(96vw,700px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide">Cash/Bank Master</h2>
          <button onClick={onClose} className="text-[#ff4444] hover:text-[#ff0000] focus:outline-none transition-colors">
            <X className="w-6 h-6" strokeWidth={3.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white pb-10">
          <div className="flex flex-col sm:flex-row gap-6">
            
            {/* Left side: Book Name */}
            <div className="flex-1">
              <label className="block text-[14px] font-bold text-gray-800 mb-2">Book Name</label>
              <input 
                type="text" 
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                placeholder="Enter Bank Name Or UPI Name"
                className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-400 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5]"
              />
            </div>
            
            {/* Right side: Active toggle & Type */}
            <div className="flex flex-col gap-3 w-full">
              
              <div className="flex flex-wrap items-center gap-2 justify-end mb-1">
                <div 
                  className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <span className="text-[14px] font-bold text-gray-800 select-none">Active</span>
                <span className="text-[14px] font-bold text-gray-800 ml-4">Type</span>
              </div>

              <div>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5] bg-white text-gray-700"
                >
                  <option>CASH BOOK</option>
                  <option>BANK BOOK</option>
                  <option>WALLET-BOOK</option>
                  <option>LOAN BOOK</option>
                  <option>NON-PAYMENT BOOK</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
          <button 
            onClick={handleSubmit}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
