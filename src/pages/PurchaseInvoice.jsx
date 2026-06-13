import React, { useState } from 'react';
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
  Image,
  Settings
} from 'lucide-react';
import { cn } from '../utils';
import { useSettings } from '../context/SettingsContext';

// Inline Youtube SVG to avoid lucide-react export issues
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

export function PurchaseInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatAmount, currentCurrency } = useSettings();
  
  const isReturn = location.pathname.includes('purchase_return');
  const pageTitle = isReturn ? 'Purchase Return' : 'Purchase Invoice';

  // Interactive Live Calculation State
  const [qty, setQty] = useState(10);
  const [freeQty, setFreeQty] = useState(2);
  const [price, setPrice] = useState(1000);
  
  const [disc1, setDisc1] = useState(10);
  const [disc1Type, setDisc1Type] = useState('%');
  
  const [disc2, setDisc2] = useState(5);
  const [disc2Type, setDisc2Type] = useState('%');

  // IMEI Tracking State
  const [isImeiTracked, setIsImeiTracked] = useState(true);
  const [imeiModalOpen, setImeiModalOpen] = useState(false);
  const [imeiList, setImeiList] = useState([]);

  // Toggles State
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);

  // Product Master Modal State
  const [productMasterModalOpen, setProductMasterModalOpen] = useState(false);
  const [productSettingModalOpen, setProductSettingModalOpen] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  // Terms Modal State
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsText, setTermsText] = useState("1.Goods once sold will not be taken back or exchanged");

  const [toggles, setToggles] = useState({
    isProduct: true,
    isRawProduct: false,
    isActive: true,
    isGstApplicable: false,
    showRawMaterials: false,
    showSubItem: false,
    psShowSubInventory: false,
    fvProductCode: false,
    fvBrand: false,
    fvCategory: true,
    fvGst: true,
    fvHsn: true,
    fvMrp: true,
    fvSalePrice: true,
    fvCreditSale: false,
    fvWholesale: false,
    fvSpecial: false,
    fvSuperSpecial: false,
    psOpeningStock: false,
    psMinQty: false,
    psReorderQty: false,
    psAutoQty: false,
    psMultiLocation: false,
    psUnitSection: true,
    psBarcode: true,
    psShowPurchasePrice: true,
  });

  const handleToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const ToggleSwitch = ({ stateKey, colorClass = 'bg-[#4F46E5]' }) => {
    const active = toggles[stateKey];
    return (
      <div 
        onClick={() => handleToggle(stateKey)}
        className={`w-[30px] h-[16px] rounded-full relative cursor-pointer transition-colors ${active ? colorClass : 'bg-gray-300'}`}
      >
        <div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] transition-all ${active ? 'right-[2px]' : 'left-[2px]'}`}></div>
      </div>
    );
  };


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
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative pb-12">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-1.5">
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
              <span className="text-[13px] font-bold text-[#dc3545] invisible md:visible absolute md:static left-1/2 -translate-x-1/2 top-4">Due Amount : {formatAmount(0)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 flex items-center">
                <select className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] appearance-none bg-white text-gray-400">
                  <option value="">Select Name</option>
                </select>
                <button className="bg-[#4F46E5] text-white px-3 py-1.5 border border-[#4F46E5] rounded-r-[3px]">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              <button className="bg-[#6c757d] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Hold
              </button>
              <button className="bg-[#28a745] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm flex items-center gap-1.5">
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
                 <button className="bg-[#4F46E5] text-white px-3 py-1 border border-[#4F46E5] rounded-r-[3px]">
                   <Search className="w-4 h-4" />
                 </button>
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Date :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   readOnly
                   value="23-05-2026"
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-600"
                 />
                 <div className="min-w-0 border border-gray-300 border-l-0 px-2 py-1 rounded-r-[3px] bg-white text-gray-500">
                   <Calendar className="w-4 h-4" />
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-[300px] overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Table Header: 10 Columns */}
            <div className="bg-[#343a40] text-white grid grid-cols-[40px_1fr_80px_80px_100px_110px_110px_80px_100px_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold leading-tight flex flex-col justify-center">
                S.NO.
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                PRODUCT NAME
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center">
                QTY
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold text-[#ffc107] flex items-center justify-center">
                FREE QTY
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex flex-col justify-center leading-tight">
                <span className="font-normal text-[10px]">(TAX INCLUDED)</span>
                <div 
                  onClick={() => setIsTaxIncluded(!isTaxIncluded)}
                  className="flex items-center justify-center gap-1 mt-0.5 cursor-pointer"
                >
                  <div className={`w-[24px] h-[14px] rounded-full relative transition-colors ${isTaxIncluded ? 'bg-[#117a8b]' : 'bg-gray-400'}`}>
                    <div className={`w-[10px] h-[10px] bg-white rounded-full absolute top-[2px] transition-all shadow-sm ${isTaxIncluded ? 'right-[2px]' : 'left-[2px]'}`}></div>
                  </div>
                  PRICE
                </div>
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300">
                DISC 1
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-blue-300">
                DISC 2
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center text-purple-300">
                IMEI
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center">
                AMOUNT
              </div>
              <div className="py-2 text-[12px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[40px_1fr_80px_80px_100px_110px_110px_80px_100px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-600">
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center relative gap-1">
                <button 
                  onClick={() => setProductMasterModalOpen(true)}
                  className="bg-[#28a745] hover:bg-[#218838] text-white p-1 rounded-sm flex items-center justify-center transition-colors shadow-sm"
                  title="Add New Product"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
                <div className="flex-1 relative flex">
                  <input type="text" placeholder="Enter Product Name" className="w-full px-2 py-1 text-[13px] outline-none border border-gray-200 rounded-[3px]" />
                </div>
              </div>
              
              <div className="border-r border-gray-200 p-1">
                 <input 
                   type="number" 
                   value={qty}
                   onChange={(e) => setQty(Number(e.target.value))}
                   className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold" 
                 />
              </div>

              <div className="border-r border-gray-200 p-1">
                 <input 
                   type="number" 
                   value={freeQty}
                   onChange={(e) => setFreeQty(Number(e.target.value))}
                   className="w-full h-full border border-yellow-300 bg-yellow-50 rounded-[3px] px-2 text-[13px] outline-none text-center font-bold text-yellow-800" 
                 />
              </div>

              <div className="border-r border-gray-200 p-1">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-right font-bold" 
                />
              </div>

              {/* Disc 1 */}
              <div className="border-r border-gray-200 p-1 flex">
                 <input 
                   type="number" 
                   value={disc1}
                   onChange={(e) => setDisc1(Number(e.target.value))}
                   className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" 
                 />
                 <select 
                   value={disc1Type}
                   onChange={(e) => setDisc1Type(e.target.value)}
                   className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center"
                 >
                   <option value="%">%</option>
                   <option value="₹">₹</option>
                 </select>
              </div>

              {/* Disc 2 */}
              <div className="border-r border-gray-200 p-1 flex">
                 <input 
                   type="number" 
                   value={disc2}
                   onChange={(e) => setDisc2(Number(e.target.value))}
                   className="w-[60%] border border-blue-200 rounded-l-[3px] px-1 text-[13px] outline-none border-r-0 text-center text-blue-800 bg-blue-50" 
                 />
                 <select 
                   value={disc2Type}
                   onChange={(e) => setDisc2Type(e.target.value)}
                   className="w-[40%] border border-blue-200 rounded-r-[3px] px-0 text-[12px] outline-none bg-blue-100 text-blue-800 appearance-none text-center"
                 >
                   <option value="%">%</option>
                   <option value="₹">₹</option>
                 </select>
              </div>

              {/* IMEI Button */}
              <div className="border-r border-gray-200 p-1 flex items-center justify-center">
                {isImeiTracked ? (
                  <button onClick={() => setImeiModalOpen(true)} className={`text-[10px] font-bold px-2 py-1 rounded-[3px] transition-colors w-full h-full flex items-center justify-center ${imeiList.filter(Boolean).length === qty ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200'}`}>
                    {imeiList.filter(Boolean).length}/{qty} IMEI
                  </button>
                ) : (
                  <span className="text-[11px] text-gray-400">-</span>
                )}
              </div>

              <div className="border-r border-gray-200 p-1 flex items-center justify-end pr-2 text-[13px] font-bold text-gray-800 bg-gray-50">
                {finalAmount.toFixed(2)}
              </div>
              
              <div className="bg-[#343a40] flex items-center justify-center gap-2 p-1">
                <button onClick={() => alert('Row added!')} className="text-[#28a745] hover:text-green-400">
                  <PlusSquare className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
                <button onClick={() => alert('Row edit logged!')} className="text-white hover:text-gray-300">
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
                <span className="text-[14px] font-bold text-[#28a745]">{formatAmount(finalAmount)}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">CGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">{formatAmount(0)}</span>
              </div>
              <div className="border border-gray-200 bg-[#f8f9fa] rounded-[3px] p-2 flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-bold text-gray-700">SGST</span>
                <span className="text-[14px] font-bold text-[#007bff]">{formatAmount(0)}</span>
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
                 Terms <PlusCircle onClick={() => setTermsModalOpen(true)} className="w-4 h-4 text-[#4F46E5] cursor-pointer hover:scale-110 transition-transform" title="Edit Terms" />
               </div>
               <span className="font-bold text-gray-600 whitespace-pre-wrap">{termsText}</span>
            </div>

          </div>

          {/* Right Side (Summary Calculations) */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
               <span className="text-[13px] font-bold text-gray-800">Subtotal:</span>
               <div className="w-[200px] bg-[#e9ecef] min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] text-gray-800 font-bold text-right">
                 {formatAmount(finalAmount)}
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
                 {formatAmount(finalAmount)}
               </div>
             </div>
          </div>

        </div>
      </div>



      {/* IMEI Modal */}
      {imeiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md flex flex-col">
            <div className="bg-[#4F46E5] px-4 py-2 flex justify-between items-center text-white">
              <h3 className="font-bold text-[14px]">Enter IMEI Numbers ({imeiList.filter(Boolean).length}/{qty})</h3>
              <button onClick={() => setImeiModalOpen(false)}><X className="w-4 h-4" strokeWidth={3} /></button>
            </div>
            <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              <p className="text-[12px] text-gray-600">Please enter a unique IMEI number for each piece you are purchasing.</p>
              {Array.from({ length: qty }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-gray-500 w-[20px]">{idx + 1}.</span>
                  <input 
                    type="text" 
                    placeholder="Enter 15-digit IMEI" 
                    value={imeiList[idx] || ''}
                    onChange={(e) => {
                      const newList = [...imeiList];
                      newList[idx] = e.target.value;
                      setImeiList(newList);
                    }}
                    className="flex-1 border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5]" 
                  />
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end border-t border-gray-200">
              <button onClick={() => setImeiModalOpen(false)} className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-bold shadow-sm">Confirm IMEIs</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Master Modal */}
      {productMasterModalOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded shadow-2xl w-full max-w-[900px] flex flex-col overflow-hidden border border-gray-300">
            
            {/* Modal Header */}
            <div className="bg-[#4F46E5] px-3 py-2 flex items-center justify-between">
              <h3 className="text-white font-bold text-[15px]">Product Master</h3>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-[13px] font-medium">Product</span>
                  <div onClick={() => handleToggle('isProduct')} className="w-[30px] h-[16px] bg-[#0056b3] rounded-full relative cursor-pointer border border-[#004085]"><div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[1px] transition-all ${toggles.isProduct ? 'left-[2px]' : 'right-[2px]'}`}></div></div>
                  <span className="text-white text-[13px] font-medium">Service</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setProductSettingModalOpen(true)}
                    className="text-white hover:text-gray-200 p-1"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setProductMasterModalOpen(false)} 
                    className="bg-[#dc3545] text-white p-1 ml-1 hover:bg-[#c82333] transition-colors rounded-sm"
                  >
                    <X className="w-5 h-5 font-bold" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              
              <div className="flex items-center gap-2 mb-2">
                <div onClick={() => handleToggle('isRawProduct')} className={`w-[28px] h-[14px] rounded-full relative cursor-pointer transition-colors ${toggles.isRawProduct ? 'bg-[#007bff]' : 'bg-gray-300'}`}><div className={`w-[10px] h-[10px] bg-white rounded-full absolute top-[2px] transition-all ${toggles.isRawProduct ? 'right-[2px]' : 'left-[2px]'}`}></div></div>
                <span className="text-[12px] font-bold text-gray-500">Raw Product</span>
              </div>

              {/* Form Row 1 */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-gray-800">Product Name</label>
                <div className="flex items-center gap-3">
                  <input type="text" placeholder="Software Inventor Billing" className="flex-1 border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-gray-800 focus:border-[#4F46E5]" />
                  <div className="flex items-center gap-1.5">
                    <ToggleSwitch stateKey="isActive" colorClass="bg-[#4F46E5]" />
                    <span className="text-[12px] font-bold text-gray-700">Active</span>
                  </div>
                </div>
              </div>

              {/* Form Row 2 */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-gray-800">Category</label>
                <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-gray-800">
                  <option></option>
                </select>
              </div>

              {/* Form Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] font-bold text-gray-800">Gst</label>
                    <div className="flex items-center gap-1">
                      <div onClick={() => handleToggle('isGstApplicable')} className={`w-[24px] h-[12px] rounded-full relative cursor-pointer transition-colors ${toggles.isGstApplicable ? 'bg-[#007bff]' : 'bg-gray-300'}`}><div className={`w-[8px] h-[8px] bg-white rounded-full absolute top-[2px] transition-all ${toggles.isGstApplicable ? 'right-[2px]' : 'left-[2px]'}`}></div></div><span className="text-[11px] text-gray-500">Applicable : {toggles.isGstApplicable ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-[#e9ecef] text-gray-600">
                    <option>@0 %</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] font-bold text-gray-800">HSN</label>
                    <RefreshCw className="w-3.5 h-3.5 text-[#4F46E5] cursor-pointer" />
                  </div>
                  <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-gray-800">
                    <option></option>
                  </select>
                </div>
              </div>

              {/* Form Row 4 */}
              <div className="grid grid-cols-[100px_1fr_100px_100px] gap-3 items-end bg-[#f1f3f5] p-2 rounded-[3px] border border-gray-200 mt-2 relative">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-800 text-center bg-gray-200 py-1 mb-1 border-b border-gray-300">Unit</label>
                  <select className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white">
                    <option>pcs</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-800 text-center bg-gray-200 py-1 mb-1 border-b border-gray-300">Barcode <span className="font-normal text-gray-500">M</span> <ChevronDown className="inline w-3 h-3" /></label>
                  <div className="flex items-center gap-1">
                    <input type="text" value="* M106" readOnly className="w-[60px] border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] outline-none bg-[#e9ecef] text-gray-600" />
                    <input type="text" className="flex-1 border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-800 text-center text-gray-600 py-1 mb-1">MRP</label>
                  <input type="text" placeholder="12000" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-center" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-gray-800 text-center text-gray-600 py-1 mb-1">Sale</label>
                  <input type="text" placeholder="7999" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-[#e9ecef] text-center text-gray-600" />
                </div>

                {/* Additional Units Button */}
                <div className="absolute -bottom-8 right-2 flex items-center gap-1">
                  <button className="bg-[#28a745] hover:bg-[#218838] text-white p-1 rounded-sm shadow-sm">
                    <PlusSquare className="w-4 h-4" />
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 text-[#28a745] px-2 py-1 rounded-sm shadow-sm flex items-center gap-1 text-[11px] font-bold">
                    <Edit className="w-3 h-3" /> Units Master
                  </button>
                </div>
              </div>

              {/* Spacer for absolute buttons */}
              <div className="h-6"></div>

              {/* Toggles */}
              <div className="flex items-center justify-center gap-12 border-t border-gray-200 pt-4 mt-2">
                <div 
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className={`w-[36px] h-[18px] rounded-full relative transition-colors ${showMoreInfo ? 'bg-[#007bff]' : 'bg-gray-300'}`}>
                    <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${showMoreInfo ? 'right-[2px]' : 'left-[2px]'}`}></div>
                  </div>
                  <span className={`text-[11px] font-bold ${showMoreInfo ? 'text-gray-800' : 'text-gray-500'}`}>More Info</span>
                </div>
                <div onClick={() => handleToggle('showRawMaterials')} className="flex flex-col items-center gap-1 cursor-pointer"><div className={`w-[36px] h-[18px] rounded-full relative transition-colors ${toggles.showRawMaterials ? 'bg-[#007bff]' : 'bg-gray-300'}`}><div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${toggles.showRawMaterials ? 'right-[2px]' : 'left-[2px]'}`}></div></div><span className={`text-[11px] font-bold ${toggles.showRawMaterials ? 'text-gray-800' : 'text-gray-500'}`}>Raw Materials</span></div>
                <div onClick={() => handleToggle('showSubItem')} className="flex flex-col items-center gap-1 cursor-pointer"><div className={`w-[36px] h-[18px] rounded-full relative transition-colors ${toggles.showSubItem ? 'bg-[#007bff]' : 'bg-gray-300'}`}><div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${toggles.showSubItem ? 'right-[2px]' : 'left-[2px]'}`}></div></div><span className={`text-[11px] font-bold ${toggles.showSubItem ? 'text-gray-800' : 'text-gray-500'}`}>Sub Item</span></div>
              </div>

              {/* More Info Section */}
              {showMoreInfo && (
                <>
                  <div className="grid grid-cols-5 gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Commission Type</label>
                      <select className="border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] bg-white text-gray-700">
                        <option>Normal Commission</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Size</label>
                      <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Colour</label>
                      <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Expiry Month</label>
                      <input type="text" placeholder="0" className="border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] bg-white text-center" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Location</label>
                      <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Product Hindi Name</label>
                      <input type="text" placeholder="software inventor billing" className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] bg-[#f8f9fa] text-gray-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Description</label>
                      <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] bg-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Terms & Condition</label>
                      <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] bg-[#f8f9fa]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-gray-700">Product Tags</label>
                      <select className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] bg-white">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </>
              )}

            </div>
            
            {/* Modal Footer */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-end items-center gap-2">
              <button className="bg-[#343a40] hover:bg-[#23272b] text-white p-1.5 rounded-[3px] transition-colors shadow-sm" title="Add Image">
                <Image className="w-4 h-4" />
              </button>
              <button className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm">
                Update
              </button>
              <button 
                onClick={() => setProductMasterModalOpen(false)}
                className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Product Setting Modal */}
      {productSettingModalOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded shadow-2xl w-full max-w-[850px] flex flex-col overflow-hidden border border-gray-300 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#4F46E5] px-3 py-2 flex items-center justify-between">
              <h3 className="text-white font-bold text-[15px]">Product Setting</h3>
              <button 
                onClick={() => setProductSettingModalOpen(false)} 
                className="text-[#dc3545] hover:text-red-200 transition-colors p-0.5 bg-white rounded-sm"
              >
                <X className="w-4 h-4 font-bold" strokeWidth={3} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              
              {/* EXTRA COLUMNS */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[12px] font-bold text-gray-700 uppercase">EXTRA COLUMNS</h4>
                <div className="flex items-end gap-3">
                  <div className="flex flex-col gap-1 w-[200px]">
                    <label className="text-[11px] font-bold text-gray-700">Name</label>
                    <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] outline-none bg-white focus:border-[#4F46E5] bg-[#d1ecf1]" />
                  </div>
                  <div className="flex flex-col gap-1 w-[200px]">
                    <label className="text-[11px] font-bold text-gray-700">Default</label>
                    <input type="text" className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] outline-none bg-white" />
                  </div>
                  <button className="bg-[#28a745] hover:bg-[#218838] text-white p-1.5 rounded-[3px] shadow-sm mb-[2px]">
                    <PlusSquare className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px] text-gray-500">No extra columns yet.</span>
              </div>

              {/* DEFAULTS */}
              <div className="flex flex-col gap-2 border-t border-gray-200 pt-3">
                <h4 className="text-[12px] font-bold text-gray-700 uppercase">DEFAULTS</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-700">Commission</label>
                    <select className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] outline-none bg-white text-gray-700">
                      <option>Normal</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-gray-700">Barcode heads</label>
                    <select className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[12px] outline-none bg-[#f8f9fa] text-gray-700">
                      <option>* M</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SUB INVENTORY */}
              <div className="flex flex-col gap-2 border-t border-gray-200 pt-3">
                <h4 className="text-[12px] font-bold text-gray-700 uppercase">SUB INVENTORY</h4>
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[16px] bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] left-[2px]"></div>
                  </div>
                  <span className="text-[12px] text-gray-600">Show Sub Inventory in Product Master</span>
                </div>
              </div>

              {/* FIELD VISIBILITY */}
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-3">
                <div>
                  <h4 className="text-[12px] font-bold text-gray-700 uppercase mb-1">FIELD VISIBILITY</h4>
                  <span className="text-[10px] text-gray-500">Switch <span className="font-bold text-gray-700">on</span> = show - <span className="font-bold text-gray-700">off</span> = hide</span>
                </div>
                
                {/* Product Form */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <h5 className="text-[13px] font-bold text-[#4F46E5] mb-3">Product Form</h5>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvProductCode" />
                      <span className="text-[12px] text-gray-600">Product code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvBrand" />
                      <span className="text-[12px] text-gray-600">Brand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvCategory" />
                      <span className="text-[12px] text-gray-600">Category</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvGst" />
                      <span className="text-[12px] text-gray-600">GST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvHsn" />
                      <span className="text-[12px] text-gray-600">HSN</span>
                    </div>
                  </div>
                </div>

                {/* Sale Prices */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <h5 className="text-[13px] font-bold text-[#4F46E5] mb-3">Sale Prices</h5>
                  <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvMrp" />
                      <span className="text-[12px] text-gray-600">MRP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvSalePrice" />
                      <span className="text-[12px] text-gray-600">Sale / cash price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvCreditSale" />
                      <span className="text-[12px] text-gray-600">Credit sale price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvWholesale" />
                      <span className="text-[12px] text-gray-600">Wholesale price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvSpecial" />
                      <span className="text-[12px] text-gray-600">Special price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="fvSuperSpecial" />
                      <span className="text-[12px] text-gray-600">Super special price</span>
                    </div>
                  </div>
                </div>

                {/* Others */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <h5 className="text-[13px] font-bold text-[#4F46E5] mb-3">Others</h5>
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psOpeningStock" />
                      <span className="text-[12px] text-gray-600">Opening stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psMinQty" />
                      <span className="text-[12px] text-gray-600">Minimum quantity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psReorderQty" />
                      <span className="text-[12px] text-gray-600">Reorder quantity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psAutoQty" />
                      <span className="text-[12px] text-gray-600">Auto quantity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psMultiLocation" />
                      <span className="text-[12px] text-gray-600">Multi location</span>
                    </div>
                  </div>
                </div>

                {/* Units */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <h5 className="text-[13px] font-bold text-[#4F46E5] mb-3">Units</h5>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psUnitSection" />
                      <span className="text-[12px] text-gray-600">Unit section</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ToggleSwitch stateKey="psBarcode" />
                      <span className="text-[12px] text-gray-600">Barcode</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PURCHASE PRICE CODE */}
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-3">
                <h4 className="text-[12px] font-bold text-[#4F46E5] uppercase">PURCHASE PRICE CODE</h4>
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[16px] bg-[#4F46E5] rounded-full relative cursor-pointer">
                    <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] right-[2px]"></div>
                  </div>
                  <span className="text-[12px] text-gray-600">Show purchase price as code</span>
                </div>
                
                <p className="text-[10px] text-gray-500">
                  Assign one letter to each digit 0-9 (for example, 0&rarr;A, 5&rarr;S). For 14 bills, also turn on <span className="font-bold text-gray-700">Show Secret Price</span> in Print Settings.
                </p>

                <div className="flex flex-col gap-2 mt-1">
                  <h5 className="text-[12px] font-bold text-gray-700">Markup %</h5>
                  <div className="flex items-center gap-3">
                    <input type="text" placeholder="0" className="w-[100px] border border-gray-300 rounded-[3px] px-2 py-1 text-[12px] outline-none bg-white" />
                    <span className="text-[11px] text-gray-500">Example: purchase price 100 with 20% markup encodes as 120.</span>
                  </div>
                </div>

                {/* Letter grid */}
                <div className="grid grid-cols-10 gap-1 mt-2 mb-2">
                  {[
                    { d: '0', l: 'O' }, { d: '1', l: 'A' }, { d: '2', l: 'B' }, { d: '3', l: 'C' },
                    { d: '4', l: 'D' }, { d: '5', l: 'E' }, { d: '6', l: 'F' }, { d: '7', l: 'G' },
                    { d: '8', l: 'H' }, { d: '9', l: 'I' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-gray-600 mb-1">{item.d}</span>
                      <input type="text" value={item.l} readOnly className="w-full border border-gray-300 rounded-[3px] py-1 text-[12px] text-center bg-[#e9ecef] font-bold text-gray-700 outline-none" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-end items-center gap-2">
              <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm">
                Save
              </button>
              <button 
                onClick={() => setProductSettingModalOpen(false)}
                className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Terms Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[500px] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#4F46E5] px-4 py-2.5 flex items-center justify-between">
              <h3 className="text-white font-bold text-[15px]">Edit Terms & Conditions</h3>
              <button 
                onClick={() => setTermsModalOpen(false)} 
                className="text-white hover:text-red-200 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <label className="text-[13px] font-bold text-gray-700">Terms Content</label>
              <textarea 
                rows="5"
                value={termsText}
                onChange={(e) => setTermsText(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] resize-none shadow-sm"
              />
            </div>
            <div className="bg-[#f8f9fa] px-4 py-3 flex justify-end gap-2 border-t border-gray-200">
              <button 
                onClick={() => setTermsModalOpen(false)}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-6 py-[7px] rounded-[3px] text-[14px] font-bold shadow-sm transition-colors"
              >
                Save Terms
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
