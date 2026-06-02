import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, PlusSquare, Plus, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

export function BankLedger() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [bankSearch, setBankSearch] = React.useState("");
  const dropdownRef = React.useRef(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [banks, setBanks] = React.useState([
    { id: 1, name: 'Cash Account', balance: '-9,050', type: 'CASH BOOK', typeColor: 'text-[#28a745]' },
    { id: 2, name: 'bank', balance: '10,500', type: 'BANK BOOK', typeColor: 'text-[#28a745]' },
    { id: 3, name: 'other account', balance: '-32,900', type: 'NON-PAYMENT BOOK', typeColor: 'text-[#ffc107]' },
  ]);

  const handleDeleteBank = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this account?')) {
      setBanks(banks.filter(b => b.id !== id));
    }
  };

  const handleEditBank = (e, name) => {
    e.stopPropagation();
    alert(`Editing details for ${name}`);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Bank Book</h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-[#dc3545] hover:text-red-700 bg-[#f8f9fa] rounded-sm p-0.5 transition-colors"
          >
            <X className="w-5 h-5 font-bold" strokeWidth={4} />
          </button>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex flex-col gap-1 max-w-[min(92vw,500px)]">
             <div className="flex justify-between items-center px-1">
               <label className="text-[13px] font-bold text-gray-800">From Cash/Bank</label>
               <span className="text-[13px] font-bold text-[#dc3545]">Account Balance : 0</span>
             </div>
             <div className="relative w-full" ref={dropdownRef}>
               <div className="relative flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(true)}>
                 <input 
                   type="text"
                   value={bankSearch}
                   onChange={(e) => {
                     setBankSearch(e.target.value);
                     setIsDropdownOpen(true);
                   }}
                   placeholder="Enter Bank Name Or UPI Name"
                   className="w-full bg-[#add8e6] border border-[#add8e6] text-[#0056b3] placeholder-[#0056b3] rounded-[3px] px-3 py-1.5 pr-10 text-[14px] outline-none font-medium cursor-pointer"
                 />
                 <div className="absolute right-2 flex items-center gap-1.5 text-[#0056b3]">
                   <X className="w-3 h-3 hover:text-gray-800 cursor-pointer" onClick={(e) => { e.stopPropagation(); setBankSearch(''); }} />
                   {isDropdownOpen ? <ChevronUp className="w-4 h-4 cursor-pointer hover:text-gray-800" /> : <ChevronDown className="w-4 h-4 cursor-pointer hover:text-gray-800" />}
                 </div>
               </div>
               
               {isDropdownOpen && (
                 <div className="absolute top-full left-0 w-full mt-0.5 bg-white border border-gray-300 rounded-[3px] shadow-xl z-50 max-h-[300px] overflow-y-auto">
                   {banks.filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase())).map((b, index) => (
                     <div 
                       key={b.id} 
                       onClick={() => { setBankSearch(b.name); setIsDropdownOpen(false); }}
                       className={`p-2 border-b border-gray-200 hover:bg-[#add8e6] cursor-pointer flex justify-between ${index === 0 ? 'bg-[#add8e6]' : 'bg-white'}`}
                     >
                       <div className="flex flex-col">
                         <span className="font-bold text-[13px] text-gray-900">{b.name}</span>
                         <span className={`text-[11px] font-bold mt-0.5 ${b.typeColor}`}>{b.type}</span>
                       </div>
                       <div className="flex flex-col items-end justify-between">
                         <span className="text-[13px] text-gray-800 font-medium">{b.balance}</span>
                         <div className="flex gap-2 mt-1">
                           <Edit2 className="w-3.5 h-3.5 text-[#17a2b8] hover:text-cyan-700" onClick={(e) => handleEditBank(e, b.name)} />
                           <Trash2 className="w-3.5 h-3.5 text-[#dc3545] hover:text-red-700" onClick={(e) => handleDeleteBank(e, b.id)} />
                         </div>
                       </div>
                     </div>
                   ))}
                   {banks.filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase())).length === 0 && (
                     <div className="p-3 text-center text-[12px] text-gray-500">No accounts found</div>
                   )}
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-[#343a40] text-white grid grid-cols-[60px_130px_1fr_150px_120px_150px_60px] text-center border-b border-gray-600">
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex flex-col justify-center items-center">
                S.NO.
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Date
              </div>
              <div className="border-r border-gray-600 py-2.5 px-4 text-[13px] font-bold flex items-center justify-between">
                <span>To Cash/Bank</span>
                <span className="text-[#28a745]">Account Balance : 0</span>
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Payment Transfer
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Bank Charges
              </div>
              <div className="border-r border-gray-600 py-2.5 text-[13px] font-bold flex items-center justify-center">
                Other Info
              </div>
              <div className="py-2.5 text-[13px] font-bold flex items-center justify-center">
                Action
              </div>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-[60px_130px_1fr_150px_120px_150px_60px] bg-white border-b border-gray-200">
              <div className="border-r border-gray-200 flex items-center justify-center p-1 bg-[#343a40]">
                <span className="text-white text-[12px] font-bold">#</span>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input 
                  type="date" 
                  defaultValue="2026-05-23"
                  className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-600"
                />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                 <select className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-500 bg-white">
                   <option>Enter Bank Name Or UPI Name</option>
                 </select>
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" value="0" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-center" readOnly />
              </div>
              <div className="border-r border-gray-200 p-1 flex items-center">
                <input type="text" placeholder="Enter Other" className="w-full h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none" />
              </div>
              <div className="bg-[#343a40] flex items-center justify-center p-1">
                <button className="bg-[#28a745] hover:bg-[#218838] flex items-center justify-center w-[26px] h-[26px] rounded-[2px]">
                  <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
