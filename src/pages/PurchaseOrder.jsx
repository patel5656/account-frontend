import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, 
  Search, 
  Calendar, 
  DownloadCloud, 
  RefreshCw,
  PlusSquare,
  Edit,
  Check,
  Printer,
  ChevronDown,
  PlusCircle,
  Grip,
  PauseCircle,
  Plus
} from 'lucide-react';
import { cn } from '../utils';
import { HoldInvoiceModal } from '../components/HoldInvoiceModal';
import { ImportInvoiceAIModal } from '../components/ImportInvoiceAIModal';

// Inline Youtube SVG to avoid lucide-react export issues
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

export function PurchaseOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pageTitle = 'Purchase Order';

  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const dateInputRef = useRef(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  };

  // Interactive Live Calculation State
  const [qty, setQty] = useState(10);
  const [freeQty, setFreeQty] = useState(2);
  const [price, setPrice] = useState(1000);
  
  const [disc1, setDisc1] = useState(10);
  const [disc1Type, setDisc1Type] = useState('%');
  
  const [disc2, setDisc2] = useState(5);
  const [disc2Type, setDisc2Type] = useState('%');

  // Calculation Logic
  const baseAmount = (qty || 0) * (price || 0);
  
  // Disc 1 Applied on Base Amount
  let d1Amt = 0;
  if (disc1Type === '%') {
    d1Amt = baseAmount * ((disc1 || 0) / 100);
  } else {
    d1Amt = (disc1 || 0);
  }
  const amountAfterD1 = Math.max(0, baseAmount - d1Amt);

  // Disc 2 Applied on Remaining Amount
  let d2Amt = 0;
  if (disc2Type === '%') {
    d2Amt = amountAfterD1 * ((disc2 || 0) / 100);
  } else {
    d2Amt = (disc2 || 0);
  }
  
  const finalAmount = Math.max(0, amountAfterD1 - d2Amt);
  const totalDiscAmount = d1Amt + d2Amt;
  const totalQty = (qty || 0) + (freeQty || 0);

  // For summary display percentage roughly
  const effectiveDiscPercent = baseAmount > 0 ? ((totalDiscAmount / baseAmount) * 100).toFixed(2) : 0;

  return (
    <>
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative pb-12">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#17a2b8] flex items-center justify-between px-3 py-1.5">
          <h2 className="text-white font-medium text-[15px]">{pageTitle}</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-white text-[13px] font-bold">Credit</span>
              <div className="w-[28px] h-[16px] bg-[#117a8b] rounded-full relative cursor-pointer border border-[#148ea1]">
                <div className="w-[12px] h-[12px] bg-[#4F46E5] rounded-full absolute top-[1px] right-[1px]"></div>
              </div>
              <span className="text-white text-[13px] font-bold">Cash</span>
            </div>
            
            <button className="bg-white p-1 rounded-sm shadow-sm">
              <YoutubeIcon className="w-4 h-4 text-[#ff0000]" />
            </button>
            <button className="bg-[#ffc107] p-1 rounded-sm shadow-sm">
              <RefreshCw className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] p-1 rounded-sm shadow-sm hover:bg-[#c82333] transition-colors"
            >
              <X className="w-4 h-4 text-white font-bold" strokeWidth={4} />
            </button>
          </div>
        </div>

        {/* Top Form Controls */}
        <div className="p-3 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-gray-800">Company Name</label>
              <span className="text-[13px] font-bold text-[#dc3545] invisible md:visible absolute md:static left-1/2 -translate-x-1/2 top-4">Due Amount : 0</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 flex items-center">
                <select className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#17a2b8] appearance-none bg-white text-gray-400">
                  <option value="">Select Name</option>
                </select>
                <button className="bg-[#17a2b8] text-white px-3 py-1.5 border border-[#17a2b8] rounded-r-[3px]">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => setIsHoldModalOpen(true)}
                className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <PauseCircle className="w-3.5 h-3.5" /> Hold
              </button>
              <button 
                onClick={() => setIsImportModalOpen(true)}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <DownloadCloud className="w-4 h-4" /> Import Invoice (AI)
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center gap-3">
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Invoice No :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   disabled
                   placeholder="(AUTO GENRATED)"
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-400"
                 />
                 <button className="bg-[#17a2b8] text-white px-3 py-1 border border-[#17a2b8] rounded-r-[3px]">
                   <Search className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Date :</label>
               <div className="flex-1 flex items-center relative">
                 <input 
                   ref={dateInputRef}
                   type="date"
                   value={invoiceDate}
                   onChange={(e) => setInvoiceDate(e.target.value)}
                   className="absolute w-0 h-0 opacity-0 -z-10"
                 />
                 <input 
                   type="text" 
                   readOnly
                   value={formatDisplayDate(invoiceDate)}
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-600 outline-none"
                 />
                 <button 
                   onClick={() => {
                     try {
                       dateInputRef.current?.showPicker();
                     } catch (e) {
                       dateInputRef.current?.focus();
                     }
                   }}
                   className="min-w-0 border border-gray-300 border-l-0 px-2 py-1 rounded-r-[3px] bg-white text-gray-500 hover:bg-gray-50 transition-colors"
                 >
                   <Calendar className="w-4 h-4" />
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-[300px] overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Table Header: 8 Columns */}
            <div className="bg-[#343a40] text-white grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1.5fr_1fr_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold leading-tight flex flex-col justify-center">
                S.NO.
                <span className="text-[10px]">#</span>
              </div>
              <div className="border-r border-gray-600 py-2 px-2 flex items-center justify-between">
                <span className="text-[12px] font-bold">PRODUCT NAME</span>
                <div className="flex items-center gap-1 bg-[#17a2b8] px-2 py-0.5 rounded-sm">
                  <span className="text-[10px] font-bold">Barcode</span>
                </div>
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center">
                QUANTITY
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center">
                MRP
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center">
                DIS
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center leading-tight">
                <span className="font-normal text-[10px]">(TAX EXCLUDED)</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <div className="w-[20px] h-[10px] bg-[#117a8b] rounded-full relative">
                    <div className="w-[8px] h-[8px] bg-white rounded-full absolute top-[1px] left-[1px]"></div>
                  </div>
                  PRICE
                </div>
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                AMOUNT
              </div>
              <div className="py-2 text-[12px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1.5fr_1fr_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-600">
              </div>
              <div className="border-r border-gray-200 p-1 flex">
                <input type="text" placeholder="Enter Barcode" className="w-full px-2 py-1 text-[13px] outline-none border border-gray-300 rounded-l-[3px]" />
                <button className="bg-gray-100 border border-gray-300 border-l-0 text-gray-600 px-2 rounded-r-[3px] font-bold flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5v14M21 5v14M8 5v14M12 5v14M16 5v14"/></svg>
                </button>
              </div>
              
              <div className="border-r border-gray-200 p-1 flex">
                 <input 
                   type="number" 
                   value={qty}
                   onChange={(e) => setQty(Number(e.target.value))}
                   className="w-[60%] h-full border border-gray-200 rounded-l-[3px] px-2 text-[13px] outline-none text-center font-bold" 
                 />
                 <select className="w-[40%] border border-gray-200 rounded-r-[3px] text-[12px] outline-none bg-gray-50 border-l-0 text-center text-gray-500 appearance-none">
                   <option>Units</option>
                 </select>
              </div>

              <div className="border-r border-gray-200 p-1">
                 <input 
                   type="number" 
                   value={price}
                   onChange={(e) => setPrice(Number(e.target.value))}
                   className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold" 
                 />
              </div>

              <div className="border-r border-gray-200 p-1 flex">
                 <input 
                   type="number" 
                   value={disc1}
                   onChange={(e) => setDisc1(Number(e.target.value))}
                   className="w-[60%] h-full border border-gray-200 rounded-l-[3px] px-1 text-[13px] outline-none text-center font-bold border-r-0" 
                 />
                 <div className="w-[40%] bg-gray-50 border border-gray-200 rounded-r-[3px] flex items-center justify-center text-[12px] text-gray-500 font-bold">%</div>
              </div>

              <div className="border-r border-gray-200 p-1">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold" 
                />
              </div>

              <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] font-bold text-gray-800 bg-gray-50">
                {finalAmount.toFixed(2)}
              </div>
              
              <div className="bg-[#343a40] flex items-center justify-center gap-2 p-1">
                <button className="bg-[#28a745] rounded-[3px] p-0.5 text-white hover:bg-green-600">
                  <Plus className="w-[18px] h-[18px]" strokeWidth={3} />
                </button>
                <button className="bg-transparent rounded-[3px] p-0.5 text-white hover:text-gray-300">
                  <Edit className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Calculations and Footer Area */}
        <div className="bg-white border-t border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Side (Totals, Remark, Terms) */}
          <div className="flex flex-col gap-4">
            
            <div className="summary-stats grid grid-cols-4 gap-2">
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Total Qty (Inc. Free)</span>
                <span className="text-[14px] font-bold text-[#007bff]">{totalQty}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">Taxable</span>
                <span className="text-[14px] font-bold text-[#28a745]">{finalAmount.toFixed(2)}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">CGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">0</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">SGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">0</span>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Remark</label>
              <textarea 
                placeholder="Remark..." 
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] resize-none h-[40px] text-gray-400"
              />
            </div>

            <div className="flex flex-col text-[13px]">
               <div className="flex flex-wrap items-center gap-1 mb-1 text-gray-500 text-[15px]">
                 Terms <PlusCircle className="w-4 h-4 text-[#4F46E5] cursor-pointer" />
               </div>
               <span className="font-bold text-gray-600">1.Goods once sold will not be taken back or exchanged</span>
            </div>

          </div>

          {/* Right Side (Summary Calculations) */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <span className="text-[13px] font-bold text-gray-800">Subtotal:</span>
               <div className="w-[200px] bg-[#e9ecef] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] text-gray-800 font-bold text-right">
                 {finalAmount.toFixed(2)}
               </div>
             </div>

             <div className="flex justify-between items-start">
               <span className="text-[13px] font-bold text-gray-800 mt-3">Discount:</span>
               <div className="w-[200px] flex gap-2">
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis.%</span>
                   <input type="text" value={effectiveDiscPercent} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-blue-700 font-bold" readOnly />
                 </div>
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Dis. Amount</span>
                   <input type="text" value={totalDiscAmount.toFixed(2)} className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right text-blue-700 font-bold" readOnly />
                 </div>
               </div>
             </div>

             <div className="flex justify-between items-start">
               <span className="text-[13px] font-bold text-gray-800 mt-3">Fright Charges:</span>
               <div className="w-[200px] flex gap-2">
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Amount</span>
                   <input type="text" value="0" className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" readOnly />
                 </div>
                 <div className="flex-1 relative mt-[18px]">
                   <span className="absolute -top-[18px] left-0 text-[11px] font-bold text-gray-800">Gst %</span>
                   <input type="text" value="0" className="w-full min-w-0 border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none bg-white text-right" readOnly />
                 </div>
               </div>
             </div>

             <div className="flex items-center justify-between mt-1">
               <span className="text-[13px] font-bold text-gray-800">Final Amount:</span>
               <div className="w-[200px] bg-[#e9ecef] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[14px] text-[#28a745] font-bold text-right shadow-sm border-[#28a745]">
                 {finalAmount.toFixed(2)}
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-[#343a40] z-40 px-4 py-2 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-1 text-[12px] font-bold">
          <span className="text-white">Last Invoice Total:</span>
          <span className="text-[#ffc107]">0</span>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 flex-1 max-w-[400px] mx-auto">
          <button className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors">
            <Check className="w-4 h-4" strokeWidth={3} />
            Save
          </button>
          
          <div className="flex items-center">
            <button className="flex items-center gap-1 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-l-[3px] text-[13px] transition-colors">
              <RefreshCw className="w-3.5 h-3.5" strokeWidth={3} />
              Convert Type
            </button>
            <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-2 py-1.5 rounded-r-[3px] border-l border-[#d39e00] transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>

          <button className="flex items-center gap-1 bg-[#17a2b8] hover:bg-[#138496] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors">
            <Printer className="w-4 h-4" strokeWidth={3} />
            Print
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={3} />
            Close
          </button>
        </div>

        <button className="flex items-center gap-2 bg-[#23272b] hover:bg-[#1d2124] text-white px-3 py-1.5 rounded-[3px] text-[12px] border border-gray-600 transition-colors invisible sm:visible">
          <Grip className="w-4 h-4" />
          Shortcut keys
          <ChevronDown className="w-3.5 h-3.5 ml-1" strokeWidth={3} />
        </button>
      </div>

    </div>

      <HoldInvoiceModal 
        isOpen={isHoldModalOpen} 
        onClose={() => setIsHoldModalOpen(false)} 
      />
      <ImportInvoiceAIModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
