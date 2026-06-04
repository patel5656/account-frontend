import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Printer, Calendar, Paperclip, PlusSquare, Filter, FileDown, Search, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import { cn } from '../utils';

export function CustomerLedger() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [entries, setEntries] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [customerSearch, setCustomerSearch] = React.useState("");
  const dropdownRef = React.useRef(null);
  const [entryDate, setEntryDate] = React.useState("2026-05-23");
  const dateInputRef = React.useRef(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dummyCustomers = [
    { id: 1, name: 'SIDDU', balance: '10,350', details: 'City: Mobile No: drug liecence:' },
    { id: 2, name: 'SIDDU', balance: '0', details: 'City: Mobile No:' },
    { id: 3, name: 'ahsish', balance: '1,500', details: 'City: Mobile No:' },
    { id: 4, name: 'ravi sir', balance: '5,400', details: 'City: Mobile No: 8051942554 drug liecence:' },
  ];

  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now(), date: formatDisplayDate(entryDate) }]);
  };

  const handleExport = () => {
    const headers = ['#', 'Date', 'Other Information', 'Voucher No', 'Bill Amount', 'Payment In', 'Dis.', 'Balance'];
    const csvRows = [headers.join(',')];
    
    if (entries.length === 0) {
      csvRows.push(['1', `"${formatDisplayDate(entryDate)}"`, '"Sample Information"', '"-"', '0', '0', '0', '0'].join(','));
    } else {
      entries.forEach((entry, index) => {
        csvRows.push([index + 1, `"${entry.date || '23-05-2026'}"`, '"Sample Information"', '"-"', '0', '0', '0', '0'].join(','));
      });
    }
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customer_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div id="printable-area" className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Customer Ledger</h2>
          
          <div className="flex flex-wrap items-center gap-2 no-print">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
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
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors"
            >
              <FileDown className="w-4 h-4" strokeWidth={2.5} />
              Export
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
        {showFilter && (
          <div className="p-3 border-b border-gray-200 no-print">
            <div className="flex flex-col gap-1 w-full max-w-[min(96vw,600px)]">
               <div className="flex justify-between items-center px-1">
                 <label className="text-[13px] font-bold text-gray-800">Customer Name</label>
                 <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
               </div>
               <div className="relative" ref={dropdownRef}>
                 <div className="relative flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(true)}>
                   <input 
                     type="text"
                     value={customerSearch}
                     onChange={(e) => {
                       setCustomerSearch(e.target.value);
                       setIsDropdownOpen(true);
                     }}
                     placeholder="Select Name"
                     className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] placeholder-[#0056b3] rounded-[3px] px-3 py-1.5 pr-10 text-[14px] outline-none font-medium cursor-pointer"
                   />
                   <div className="absolute right-2 flex items-center gap-1.5 text-gray-400">
                     <X className="w-3 h-3 hover:text-gray-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCustomerSearch(''); }} />
                     {isDropdownOpen ? <ChevronUp className="w-4 h-4 cursor-pointer hover:text-gray-600" /> : <ChevronDown className="w-4 h-4 cursor-pointer hover:text-gray-600" />}
                   </div>
                 </div>
                 
                 {isDropdownOpen && (
                   <div className="absolute top-full left-0 w-full mt-0.5 bg-white border border-gray-300 rounded-[3px] shadow-xl z-50 max-h-[300px] overflow-y-auto">
                     {dummyCustomers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase())).map((c, index) => (
                       <div 
                         key={c.id} 
                         onClick={() => { setCustomerSearch(c.name); setIsDropdownOpen(false); }}
                         className={`p-2 border-b border-gray-200 hover:bg-[#add8e6] cursor-pointer flex justify-between ${index === 1 ? 'bg-[#add8e6]' : 'bg-white'}`}
                       >
                         <div className="flex flex-col">
                           <span className="font-bold text-[13px] text-gray-900">{c.name}</span>
                           <span className="text-[11px] text-gray-800 font-medium mt-0.5">{c.details}</span>
                         </div>
                         <div className="flex flex-col items-end justify-between">
                           <span className="text-[13px] text-gray-800 font-medium">{c.balance}</span>
                           <div className="flex gap-2 mt-1">
                             <Edit2 className="w-3.5 h-3.5 text-[#17a2b8] hover:text-cyan-700" onClick={(e) => e.stopPropagation()} />
                             <Trash2 className="w-3.5 h-3.5 text-[#dc3545] hover:text-red-700" onClick={(e) => e.stopPropagation()} />
                           </div>
                         </div>
                       </div>
                     ))}
                     {dummyCustomers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase())).length === 0 && (
                       <div className="p-3 text-center text-[12px] text-gray-500">No customers found</div>
                     )}
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 w-full">
          <div className="min-w-[900px] flex flex-col h-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                #
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                DATE
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Other Information
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Voucher No
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Bill Amount
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center gap-1.5">
                <div className="w-[30px] h-[16px] bg-[#28a745] rounded-full relative cursor-pointer">
                  <div className="w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] right-[2px]"></div>
                </div>
                Payment In
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Dis.
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Balance
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                ACTION
              </div>
            </div>

            {/* Render added entries */}
            {entries.map((entry, index) => (
              <div key={entry.id} className="grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] bg-white border-b border-gray-200">
                <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-gray-100 text-[13px]">
                  {index + 1}
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  {entry.date || "23-05-2026"}
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  Sample Information
                </div>
                <div className="border-r border-gray-200 p-1 flex items-center justify-center text-[13px] text-gray-600">
                  -
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
            <div className="grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] bg-white border-b border-gray-200 no-print">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40]">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span className="text-white text-[12px] font-bold ml-1">#</span>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center relative">
                <input 
                  ref={dateInputRef}
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className="absolute w-0 h-0 opacity-0 -z-10"
                />
                <input 
                  type="text" 
                  readOnly
                  value={formatDisplayDate(entryDate)}
                  className="w-full h-[32px] border border-gray-300 border-r-0 rounded-l-[3px] px-2 text-[13px] outline-none text-gray-600"
                />
                <button 
                  onClick={() => {
                    try {
                      dateInputRef.current?.showPicker();
                    } catch (e) {
                      dateInputRef.current?.focus();
                    }
                  }}
                  className="h-[32px] border border-gray-300 border-l-0 px-2 flex items-center justify-center rounded-r-[3px] text-gray-500 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                 <input type="text" placeholder="Enter Other Information" className="w-full h-[32px] px-2 text-[13px] outline-none text-center placeholder-gray-400" />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" className="w-full h-[32px] px-2 text-[13px] outline-none" readOnly />
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
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white p-1 rounded-sm shadow-sm hover:bg-gray-100"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                </button>
                <button 
                  onClick={handleAddEntry}
                  className="text-[#28a745] hover:text-green-400"
                >
                  <PlusSquare className="w-6 h-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-[50px_130px_1fr_100px_100px_130px_70px_100px_80px] bg-white border-b border-gray-200 mt-auto">
              <div className="col-span-4 border-r border-gray-200 p-2 flex items-center justify-end">
                <span className="font-bold text-[14px] text-gray-800">Total</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="border-r border-gray-200 p-2 flex items-center justify-center">
                <span className="font-bold text-[14px] text-gray-800">0</span>
              </div>
              <div className="p-2 flex items-center justify-center">
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
