import React, { useState } from 'react';
import { X } from 'lucide-react';

export function OfferManagementModal({ isOpen, onClose, onSubmit }) {
  const [isActive, setIsActive] = useState(true);
  const [offerType, setOfferType] = useState('Flat Discount');
  const [offerName, setOfferName] = useState('');
  const [productSelection, setProductSelection] = useState('Select Specific Category');
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    const newOffer = {
      id: Date.now(),
      name: offerName || 'New Offer',
      minCart: '-',
      type: offerType === 'Buy 1 Get 1' ? 'BOGO' : offerType === 'Flat Discount' ? 'FLAT' : 'PERCENTAGE',
      target: productSelection === 'All Products' ? 'ENTIRE CART' : 'SELECTED PRODUCTS',
      offerValue: offerType === 'Buy 1 Get 1' ? 'Buy 1 Get 1' : offerType === 'Flat Discount' ? `₹${discountValue || 0} OFF` : `${discountValue || 0}% OFF`,
      schedule: startDate && endDate ? `${startDate} to ${endDate}` : 'Always Active',
      scheduleIcon: startDate && endDate ? 'CalendarClock' : null,
      usage: 0,
      priority: 'P3',
      status: isActive ? 'ACTIVE' : 'INACTIVE'
    };
    if (onSubmit) onSubmit(newOffer);
    
    // Reset form
    setOfferName('');
    setDiscountValue('');
    setStartDate('');
    setEndDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(96vw,800px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Offer Management Setup</h2>
          <button 
            onClick={onClose} 
            className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white overflow-y-auto max-h-[calc(100vh-150px)] custom-scrollbar">
          <div className="flex flex-col gap-5">
            
            {/* Row 1: Offer Name & Status */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[14px] font-bold text-gray-800">Offer Name</label>
                <input 
                  type="text" 
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder="E.g. Diwali Mega Sale"
                  className="w-full border border-[#4F46E5] bg-[#e8e5ff] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold"
                />
              </div>

              <div className="flex flex-col gap-1 md:items-end justify-center">
                <label className="text-[14px] font-bold text-gray-800 invisible md:visible h-[14px] mb-1">Status</label>
                <div className="flex items-center gap-2 h-full">
                  <div 
                    className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                </div>
              </div>
            </div>

            {/* Row 2: Offer Type & Product Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[14px] font-bold text-gray-800">Offer Type</label>
                <select 
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white font-medium"
                >
                  <option value="Buy 1 Get 1">Buy X Get Y Free</option>
                  <option value="Flat Discount">Flat Discount</option>
                  <option value="Percentage Discount">Percentage Discount</option>
                  <option value="Festival Discount">Festival Discount</option>
                  <option value="Product Offer">Product Offer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[14px] font-bold text-gray-800">Product Selection</label>
                <select 
                  value={productSelection}
                  onChange={(e) => setProductSelection(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white font-medium"
                >
                  <option>All Products</option>
                  <option>Select Specific Category</option>
                  <option>Select Specific Item</option>
                </select>
              </div>
            </div>

            {/* Row 3: Conditional Logic Fields based on Offer Type */}
            <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-4">
              {offerType === 'Buy 1 Get 1' || offerType === 'Product Offer' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-blue-800">Buy Quantity</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 1"
                      defaultValue={1}
                      className="w-full border border-blue-300 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-green-800">Get Free Quantity</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 1"
                      defaultValue={1}
                      className="w-full border border-green-300 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-800">Discount Type</label>
                    <select className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white">
                      <option>{offerType === 'Percentage Discount' ? 'Percentage (%)' : 'Flat Amount (₹)'}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-800">Discount Value</label>
                    <input 
                      type="number" 
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full border border-gray-300 rounded-[3px] px-3 py-[7px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Row 4: Start Date & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[14px] font-bold text-gray-800">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white uppercase"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-[14px] font-bold text-gray-800">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-[9px] text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white uppercase"
                />
              </div>
            </div>

            {/* Row 5: Description */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[14px] font-bold text-gray-800">Offer Description</label>
              <textarea 
                rows="3"
                placeholder="Enter offer rules and details..."
                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white resize-none"
              ></textarea>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
          <button 
            onClick={handleSubmit}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-5 py-[7px] rounded-[3px] text-[14px] font-bold transition-colors shadow-sm"
          >
            Submit
          </button>
          <button 
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-5 py-[7px] rounded-[3px] text-[14px] transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
