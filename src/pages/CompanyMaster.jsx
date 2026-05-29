import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Plus, 
  GitMerge, 
  Upload,
  ChevronsUpDown,
  Menu,
  Edit,
  Trash2
} from 'lucide-react';

export function CompanyMaster() {
  const navigate = useNavigate();
  
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeToggle, setActiveToggle] = useState(true);
  const [newPartyName, setNewPartyName] = useState('');
  
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const handlePartyAdded = (e) => {
      setRows(prev => [...prev, e.detail]);
    };
    window.addEventListener('partyAdded', handlePartyAdded);
    return () => window.removeEventListener('partyAdded', handlePartyAdded);
  }, []);

  const handleInternalSubmit = () => {
    if (newPartyName.trim() !== '') {
      setRows([...rows, { 
        id: Date.now(), 
        name: newPartyName, 
        mobile: '', 
        city: '', 
        type: 'COMPANY', 
        balance: 0 
      }]);
    }
    setNewPartyName('');
    setCreateModalOpen(false);
  };

  const handleExport = () => {
    alert("Exporting data...");
  };

  const handleWhatsApp = () => {
    alert("Opening WhatsApp...");
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Comapany Master Details</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setMergeModalOpen(true)}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <GitMerge className="w-4 h-4" />
              Merge
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex items-center justify-center bg-[#28a745] hover:bg-[#218838] text-white p-1.5 rounded-[3px] transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" strokeWidth={2.5} />
              Export
            </button>
            <button 
              onClick={() => {
                setActiveToggle(true);
                setCreateModalOpen(true);
              }}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors shadow-sm"
            >
              <X className="w-5 h-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-white">
          <div className="flex items-center w-full max-w-full">
            <div className="flex items-center bg-white min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-2 text-blue-500">
              <FilterIcon className="w-4 h-4" />
            </div>
            <select className="min-w-0 border border-gray-300 border-l-0 px-3 py-2 text-[13px] outline-none bg-white text-gray-600 w-full">
              <option>Party Name</option>
              <option>City</option>
              <option>Mobile No</option>
              <option>Party Tags</option>
            </select>
            <input 
              type="text" 
              placeholder="Search for Party Name" 
              className="flex-1 min-w-0 border border-gray-300 border-l-0 rounded-r-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 data-grid-scroll">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_200px_150px_150px_150px_150px_120px] border-b border-gray-200 bg-white">
              <HeaderCell text="#" />
              <HeaderCell text="Party Name" />
              <HeaderCell text="Mobile No" />
              <HeaderCell text="City" />
              <HeaderCell text="Type" />
              <HeaderCell text="Balance" />
              <HeaderCell text="Action" />
            </div>

            {/* Rows */}
            {rows.map((row, index) => (
              <div key={row.id} className="grid grid-cols-[60px_200px_150px_150px_150px_150px_120px] border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white">
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{index + 1}</div>
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.name}</div>
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.mobile}</div>
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.city}</div>
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.type}</div>
                <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.balance}</div>
                <div className="py-2.5 px-3 flex flex-wrap items-center gap-1">
                  <ActionButton type="menu" />
                  <ActionButton type="edit" />
                  <ActionButton type="delete" onClick={() => setRows(rows.filter(r => r.id !== row.id))} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <span className="text-[12px] text-gray-500">{rows.length} total</span>
        </div>

      </div>

      {/* Merge Modal (Company Correction) */}
      {mergeModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[400px] mx-4 overflow-hidden flex flex-col">
            <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium text-[15px]">Company Correction</h3>
              <button onClick={() => setMergeModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-6 h-6 font-bold text-[#dc3545]" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Incorrect Party Name</label>
                <select className="border border-[#4F46E5] bg-[#e8e5ff] rounded-[4px] px-3 py-2 text-[14px] text-gray-500 outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold">
                  <option>Select Name</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">Correct Party Name</label>
                <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-2 text-[14px] text-gray-400 outline-none">
                  <option>Select Name</option>
                </select>
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200 flex justify-end gap-2">
              <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-medium transition-colors shadow-sm">
                Merge
              </button>
              <button onClick={() => setMergeModalOpen(false)} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Modal (Company Master) */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium text-[15px]">Company Master</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-6 h-6 font-bold text-[#dc3545]" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-5">
                <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 sm:items-end mb-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-800">Party Name</label>
                  <input 
                    type="text" 
                    value={newPartyName}
                    onChange={(e) => setNewPartyName(e.target.value)}
                    placeholder="Enter Party Name"
                    className="border border-[#4F46E5] bg-[#e8e5ff] rounded-[4px] px-3 py-1.5 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold"
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div 
                    onClick={() => setActiveToggle(!activeToggle)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${activeToggle ? 'bg-[#007bff]' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all shadow-sm ${activeToggle ? 'left-[22px]' : 'left-[2px]'}`} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">Active</span>
                </div>
                
                <div className="flex flex-col gap-2 w-full sm:w-[250px]">
                  <label className="text-[13px] font-bold text-gray-800">Type</label>
                  <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-600 outline-none focus:border-[#4F46E5]">
                    <option>COMPANY</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={handleInternalSubmit}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-medium transition-colors shadow-sm"
              >
                Submit
              </button>
              <button onClick={() => setCreateModalOpen(false)} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const HeaderCell = ({ text }) => (
  <div className="py-2 px-3 flex items-center justify-between cursor-pointer group hover:bg-gray-50">
    <span className="text-[12px] font-bold text-gray-500 group-hover:text-gray-700">{text}</span>
    <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />
  </div>
);

const ActionButton = ({ type, onClick }) => {
  const getStyle = () => {
    switch (type) {
      case 'menu': return 'bg-[#343a40] hover:bg-[#23272b]';
      case 'edit': return 'bg-[#4F46E5] hover:bg-[#4338ca]';
      case 'delete': return 'bg-[#dc3545] hover:bg-[#c82333]';
      default: return 'bg-gray-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'menu': return <Menu className="w-3.5 h-3.5 text-white" />;
      case 'edit': return <Edit className="w-3.5 h-3.5 text-white" />;
      case 'delete': return <Trash2 className="w-3.5 h-3.5 text-white" />;
      default: return null;
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`w-[26px] h-[26px] rounded-[3px] flex items-center justify-center transition-colors shadow-sm ${getStyle()}`}
    >
      {getIcon()}
    </button>
  );
};

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
