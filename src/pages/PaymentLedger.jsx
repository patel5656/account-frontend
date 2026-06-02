import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Printer, Calendar, Paperclip, Plus, Filter } from 'lucide-react';

export function PaymentLedger() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [entries, setEntries] = React.useState([]);

  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now() }]);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <input type="file" ref={fileInputRef} className="hidden" />
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Payment Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => alert('Filtering data...')}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex flex-col gap-1 w-full max-w-[min(92vw,500px)]">
             <div className="flex justify-between items-center px-1">
               <label className="text-[13px] font-bold text-gray-800">Party Name</label>
               <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
             </div>
             <select className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] rounded-[3px] px-3 py-1.5 text-[14px] outline-none font-medium">
               <option>Select Name</option>
             </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                #
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Date
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Other Information
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Payment In
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Payment Out
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Dis.
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Balance
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                Action
              </div>
            </div>

            {/* Render added entries */}
            {entries.map((entry, index) => (
              <div key={entry.id} className="grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] bg-white border-b border-gray-200">
                <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-100 text-[13px]">
                  {index + 1}
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  23-05-2026
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  Sample Information
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  0
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  0
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  0
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  0
                </div>
                <div className="p-1 flex items-center justify-center">
                  <button className="text-red-500 hover:text-red-700" onClick={() => setEntries(entries.filter(e => e.id !== entry.id))}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Input Row */}
            <div className="grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40] text-white text-[13px] font-bold">
                #
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input 
                  type="date" 
                  defaultValue="2026-05-23"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600"
                />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                 <input type="text" placeholder="Enter Other Information" className="w-full h-[32px] px-2 text-[13px] outline-none text-center placeholder-gray-400" />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center bg-[#e9ecef]">
                <input type="text" value="0" className="w-full h-[32px] bg-transparent text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="bg-[#343a40] flex items-center justify-center gap-1.5 p-1">
                <button onClick={() => fileInputRef.current?.click()} className="bg-white p-1 rounded-sm shadow-sm hover:bg-gray-100">
                  <Paperclip className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                </button>
                <button onClick={handleAddEntry} className="bg-[#28a745] hover:bg-[#218838] flex items-center justify-center w-[26px] h-[26px] rounded-[2px]">
                  <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-[50px_130px_1fr_120px_120px_100px_100px_80px] bg-white border-b border-gray-200 mt-auto">
              <div className="col-span-3 border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-gray-800">Total :</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                 <span className="text-[13px] font-bold text-[#0056b3]">0</span>
              </div>
              <div className="p-2"></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
