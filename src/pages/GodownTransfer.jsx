import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Search, 
  Calendar, 
  RefreshCw,
  PlusSquare,
  Edit,
  Check,
  Printer,
  ChevronDown,
  ArrowRightLeft,
  Grip,
  SlidersHorizontal
} from 'lucide-react';

// Inline Youtube SVG
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export function GodownTransfer() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [transferQty, setTransferQty] = useState('');

  const handleAddItem = () => {
    if (productName && transferQty) {
      setItems([...items, {
        id: Date.now(),
        name: productName,
        stock: Math.floor(Math.random() * 100) + 10,
        qty: transferQty,
        unit: 'PCS'
      }]);
      setProductName('');
      setTransferQty('');
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col relative pb-12">
      <div className="bg-white m-3 mt-0 shadow-sm border border-gray-200 flex-1 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between px-3 py-1.5">
          <h2 className="text-white font-medium text-[15px]">Stock Transfer</h2>
          
          <div className="flex flex-wrap items-center gap-3">
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
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
               <div className="bg-[#e8f4fd] p-2 rounded-full mt-1">
                 <ArrowRightLeft className="w-5 h-5 text-[#007bff]" />
               </div>
               <div className="flex flex-col">
                 <h3 className="text-[#007bff] font-bold text-[16px]">Stock Transfer</h3>
                 <p className="text-[11px] text-gray-500 font-medium">Transfer inventory from Godown to Branch or vice-versa.</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Source (From)</label>
                <select className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-white">
                  <option>Select Warehouse/Branch</option>
                  <option>Main Godown (WH-01)</option>
                  <option>Delhi Backup Godown (WH-02)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Destination (To)</label>
                <select className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-white">
                  <option>Select Warehouse/Branch</option>
                  <option>Delhi South Branch (DEL-01)</option>
                  <option>Mumbai North Branch (MUM-02)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center gap-3">
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Transfer No :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   defaultValue="TRN-0001"
                   className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] bg-white text-gray-600 outline-none focus:border-[#4F46E5]"
                 />
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Date :</label>
               <div className="flex-1 flex items-center relative">
                 <input 
                   type="date"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}
                   id="transfer-date-input"
                   className="w-full min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-1 text-[13px] bg-white text-gray-600 outline-none focus:border-[#4F46E5] cursor-pointer"
                 />
                 <div
                   className="min-w-0 border border-gray-300 border-l-0 px-2 py-1.5 rounded-r-[3px] bg-white text-gray-500 cursor-pointer hover:bg-gray-50"
                   onClick={() => document.getElementById('transfer-date-input').showPicker()}
                 >
                   <Calendar className="w-4 h-4" />
                 </div>
               </div>
             </div>
             <div className="flex items-center justify-end w-full sm:max-w-[320px]">
               <label className="text-[13px] font-bold text-gray-800 w-[80px] text-right mr-2">Vehicle No :</label>
               <div className="flex-1 flex items-center">
                 <input 
                   type="text" 
                   placeholder="e.g. DL-1C-AA-1111"
                   className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1 text-[13px] bg-white text-gray-600 outline-none focus:border-[#4F46E5]"
                 />
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-[300px]">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_1fr_150px_150px_120px_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold leading-tight flex flex-col justify-center">
                S.NO.
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center uppercase">
                Product Name
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center uppercase">
                Current Stock (Source)
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center uppercase">
                Transfer Quantity
              </div>
              <div className="border-r border-gray-600 py-2 text-[12px] font-bold flex items-center justify-center uppercase">
                Unit
              </div>
              <div className="py-2 text-[12px] font-bold flex items-center justify-center uppercase">
                Action
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[50px_1fr_150px_150px_120px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-600"></div>
              <div className="border-r border-gray-200 p-1 flex relative">
                <input 
                  type="text" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Product Name" 
                  className="w-full px-2 py-1 text-[13px] outline-none" 
                />
                <button className="absolute right-1 top-1.5 bottom-1.5 bg-[#4F46E5] text-white text-[11px] px-2 rounded-sm font-bold flex items-center gap-1">
                  <FilterIcon className="w-3 h-3" /> Search
                </button>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-500 bg-[#f8f9fa]">
                -
              </div>
              <div className="border-r border-gray-200 p-1 flex">
                 <input 
                   type="text" 
                   value={transferQty}
                   onChange={(e) => setTransferQty(e.target.value)}
                   placeholder="Qty"
                   className="w-full border border-gray-200 rounded-[3px] px-2 text-[13px] outline-none text-center" 
                 />
              </div>
              <div className="border-r border-gray-200 p-1 flex">
                 <select className="w-full border border-gray-200 rounded-[3px] px-1 text-[13px] outline-none bg-white text-gray-500 appearance-none text-center">
                   <option>PCS</option>
                   <option>KG</option>
                   <option>BOX</option>
                 </select>
              </div>
              <div className="bg-[#343a40] flex items-center justify-center gap-2 p-1">
                <button 
                  onClick={handleAddItem}
                  className="text-[#28a745] hover:text-green-400"
                >
                  <PlusSquare className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Added Items Rows */}
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-[50px_1fr_150px_150px_120px_80px] bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="border-r border-gray-200 flex items-center justify-center p-2 text-[13px] text-gray-700">
                  {index + 1}
                </div>
                <div className="border-r border-gray-200 p-2 flex items-center text-[13px] text-gray-800 font-medium">
                  {item.name}
                </div>
                <div className="border-r border-gray-200 p-2 flex items-center justify-center text-[13px] text-[#dc3545] font-bold">
                  {item.stock}
                </div>
                <div className="border-r border-gray-200 p-2 flex items-center justify-center text-[13px] text-[#007bff] font-bold">
                  {item.qty}
                </div>
                <div className="border-r border-gray-200 p-2 flex items-center justify-center text-[13px] text-gray-600">
                  {item.unit}
                </div>
                <div className="flex items-center justify-center gap-2 p-2">
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-[#dc3545] hover:text-red-600"
                  >
                    <X className="w-[18px] h-[18px]" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Calculations Area */}
        <div className="bg-white border-t border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Side (Totals, Remark, Terms) */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-[14px] font-bold text-gray-800">
              Total Items Transferred: <span className="text-[#007bff]">{items.length}</span>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Transfer Remarks</label>
              <textarea 
                placeholder="Reason for transfer, condition of goods, etc..." 
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#4F46E5] resize-none h-[60px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-[#343a40] z-40 px-4 py-2 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-1 text-[12px] font-bold invisible sm:visible">
          <span className="text-white">Status:</span>
          <span className="text-[#28a745]">Pending Transfer</span>
        </div>
        
        <div className="flex items-center justify-center gap-1.5 flex-1 max-w-[400px] mx-auto">
          <button 
            onClick={() => {
              if (items.length === 0) {
                alert('Please add items to transfer');
                return;
              }
              alert('Stock transferred successfully!');
              setItems([]);
            }}
            className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors"
          >
            <Check className="w-4 h-4" strokeWidth={3} />
            Transfer Stock
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[13px] transition-colors"
          >
            <Printer className="w-4 h-4" strokeWidth={3} />
            Print Challan
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
  );
}
