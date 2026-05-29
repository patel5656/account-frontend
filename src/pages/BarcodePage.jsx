import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, X, Settings, Check, Printer } from 'lucide-react';
import { cn } from '../utils';

// Custom YouTube SVG Icon
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export function BarcodePage() {
  const navigate = useNavigate();
  const [isManufactureProduct, setIsManufactureProduct] = useState(false);

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Barcode</h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className="bg-white text-red-600 px-[6px] py-[4px] rounded-[3px] flex items-center justify-center transition-colors">
             <YoutubeIcon className="w-[14px] h-[14px]" />
          </button>
          <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-[6px] py-[4px] rounded-[3px] flex items-center justify-center transition-colors">
            <RefreshCw className="w-[14px] h-[14px]" strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-[6px] py-[4px] rounded-[3px] flex items-center justify-center transition-colors"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col">
        {/* Main Form Area */}
        <div className="flex flex-1 p-6 gap-6">
          
          {/* Left Form */}
          <div className="flex-1 max-w-[min(96vw,600px)] flex flex-col gap-5 pt-2">
            
            {/* Barcode Template */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-gray-800">Barcode Template</label>
              <div className="flex gap-1.5">
                <select className="flex-1 h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-white focus:border-[#4F46E5]">
                  <option>Select Template (or use default)</option>
                </select>
                <button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-2.5 rounded-[3px] flex items-center justify-center transition-colors">
                  <Settings className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Product Name & Barcode */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1 relative">
                <div className="flex items-center justify-between h-[20px] mb-1">
                  <span className="bg-[#4F46E5] text-white text-[10.5px] px-1.5 py-0.5 rounded-[2px] font-medium leading-none self-start mt-[-2px]">
                    Product Name
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <div 
                      onClick={() => setIsManufactureProduct(!isManufactureProduct)}
                      className={cn(
                        "w-8 h-[18px] rounded-full relative cursor-pointer border transition-colors duration-200",
                        isManufactureProduct ? "bg-[#4F46E5] border-[#4F46E5]" : "bg-gray-300 border-gray-400"
                      )}
                    >
                      <div className={cn(
                        "w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] transition-all duration-200",
                        isManufactureProduct ? "right-[2px]" : "left-[2px]"
                      )}></div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-800">Manufacture Product</span>
                  </div>
                </div>
                <select className="w-full h-[32px] border border-gray-300 bg-[#e8e5ff] rounded-[3px] px-2 text-[13px] outline-none text-gray-500 focus:border-[#4F46E5]">
                  <option>Enter Product Name or Barcode</option>
                </select>
              </div>
              
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800 pt-[1px] mt-[10px]">Barcode</label>
                <input 
                  type="text"
                  placeholder="Barcode Number"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none placeholder-gray-400 text-gray-700 bg-white focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* MRP & Sale Price */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">MRP</label>
                <input 
                  type="text"
                  defaultValue="0"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Sale Price</label>
                <input 
                  type="text"
                  defaultValue="0"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Quantity to Print */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Quantity to Print</label>
                <input 
                  type="text"
                  defaultValue="0"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white focus:border-[#4F46E5]"
                />
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end mt-4">
              <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors">
                <Check className="w-3.5 h-3.5" strokeWidth={3} /> Submit
              </button>
              <button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors">
                <Printer className="w-[14px] h-[14px]" strokeWidth={2} /> Print
              </button>
            </div>

          </div>

          {/* Right Preview */}
          <div className="flex-1 flex justify-end items-start pt-8 pr-4">
            <div className="w-full sm:max-w-[380px] h-[200px] border border-gray-800 bg-[#f8f9fa]">
              {/* Empty grey area representing the barcode preview as per screenshot */}
            </div>
          </div>
        </div>

        {/* Bottom Table */}
        <div className="w-full mb-1">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#343a40] text-white">
                <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[60px] whitespace-nowrap">S/NO</th>
                <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 whitespace-nowrap">Product Name</th>
                <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 whitespace-nowrap">Barcode</th>
                <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[150px] whitespace-nowrap">Quantity to Print</th>
                <th className="py-[6px] px-2 text-left text-[11px] font-bold border-r border-gray-500 w-[120px] whitespace-nowrap">Sale Price</th>
                <th className="py-[6px] px-2 text-center text-[11px] font-bold uppercase w-[80px] whitespace-nowrap">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty space below header just like screenshot */}
            </tbody>
          </table>
          </div>
          <div className="h-6 w-full border border-t-0 border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
