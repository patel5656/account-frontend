import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Plus, 
  GitMerge, 
  Upload, 
  ChevronsUpDown,
  Edit,
  Trash2,
  CalendarDays,
  Save,
  Settings
} from 'lucide-react';

import { PartyMasterModal } from '../components/PartyMasterModal';

export function CustomerMaster() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const [editData, setEditData] = useState({});

  const [searchFilter, setSearchFilter] = useState('Party Name');
  const [searchQuery, setSearchQuery] = useState('');

  const [rows, setRows] = useState([
    {
      id: 1,
      customerName: 'Demo',
      address: '',
      gstin: '',
      mobileNo: '',
      balance: '0',
      partyTags: '',
      msgSent: '0'
    }
  ]);

  React.useEffect(() => {
    const handlePartyAdded = (e) => {
      if (e.detail.type === 'CUSTOMER') {
        setRows(prev => [...prev, {
          ...e.detail,
          customerName: e.detail.name,
          address: e.detail.address || e.detail.city || '',
          gstin: e.detail.gstin || '',
          mobileNo: e.detail.mobile,
          balance: '0',
          partyTags: e.detail.partyTags || '',
          msgSent: '0'
        }]);
      }
    };
    window.addEventListener('partyAdded', handlePartyAdded);
    return () => window.removeEventListener('partyAdded', handlePartyAdded);
  }, []);

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setViewModalOpen(true);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditData({
      ...row,
      toggles: row.toggles || { moreInfo: true, wholeParty: false, sezParty: false, focParty: false }
    });
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    setRows(rows.map(r => r.id === selectedRow.id ? { ...r, ...editData, customerName: editData.name || editData.customerName, mobileNo: editData.mobile || editData.mobileNo } : r));
    setEditModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const filteredRows = rows.filter(row => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (searchFilter === 'Party Name') {
      return row.customerName?.toLowerCase().includes(query);
    } else if (searchFilter === 'City') {
      return row.address?.toLowerCase().includes(query);
    } else if (searchFilter === 'Mobile No') {
      return row.mobileNo?.toLowerCase().includes(query);
    } else if (searchFilter === 'Party Tags') {
      return row.partyTags?.toLowerCase().includes(query);
    }
    return true;
  });

  const handleExport = () => {
    if (rows.length === 0) return;
    
    const headers = ['#', 'Customer Name', 'Address', 'GSTIN', 'Mobile No', 'Balance', 'Party Tags', 'Msg Sent'];
    const csvRows = [headers.join(',')];
    
    rows.forEach((row, index) => {
      const csvRow = [
        index + 1,
        `"${row.customerName || ''}"`,
        `"${row.address || ''}"`,
        `"${row.gstin || ''}"`,
        `"${row.mobileNo || ''}"`,
        `"${row.balance || ''}"`,
        `"${row.partyTags || ''}"`,
        `"${row.msgSent || ''}"`
      ];
      csvRows.push(csvRow.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customer_master.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsApp = () => {
    if (!selectedRow) {
      alert("Please select a customer first by clicking on their row.");
      return;
    }
    const mobile = (selectedRow.mobileNo || '').replace(/\D/g, '');
    if (!mobile || mobile.length < 10) {
      alert("Selected customer does not have a valid mobile number.");
      return;
    }
    const formattedMobile = mobile.startsWith('91') && mobile.length > 10 ? mobile : `91${mobile}`;
    window.open(`https://wa.me/${formattedMobile}`, '_blank');
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">{t('customer_master.title')}</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setMergeModalOpen(true)}
              className="flex items-center gap-1.5 bg-white text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <GitMerge className="w-4 h-4" />
              {t('customer_master.merge')}
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
              {t('customer_master.export')}
            </button>
            <button 
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              {t('customer_master.create_new')}
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
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex items-center w-full max-w-[600px]">
            <div className="flex items-center bg-white min-w-0 border border-gray-300 border-r-0 rounded-l-[3px] px-3 py-2 text-blue-500">
              <FilterIcon className="w-4 h-4" />
            </div>
            <select 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="min-w-[130px] border border-gray-300 border-l-0 px-3 py-2 text-[13px] outline-none bg-white text-gray-600 cursor-pointer"
            >
              <option value="Party Name">Party Name</option>
              <option value="City">City</option>
              <option value="Mobile No">Mobile No</option>
              <option value="Party Tags">Party Tags</option>
            </select>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search for ${searchFilter}`} 
              className="flex-1 min-w-0 border border-gray-300 border-l-0 rounded-r-[3px] px-3 py-2 text-[13px] outline-none bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 data-grid-scroll">
          <div className="min-w-[900px]">
            {/* Table Header */}
            <div className="grid grid-cols-[40px_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(120px,1fr)_minmax(100px,1fr)_120px] border-b border-gray-200">
              <HeaderCell text="#" noSort />
              <HeaderCell text={t('customer_master.customer_name')} />
              <HeaderCell text={t('customer_master.address')} />
              <HeaderCell text={t('customer_master.gstin')} />
              <HeaderCell text={t('customer_master.mobile_no')} />
              <HeaderCell text={t('customer_master.balance')} />
              <HeaderCell text={t('customer_master.party_tags')} />
              <HeaderCell text={t('customer_master.msg_sent')} />
              <HeaderCell text={t('customer_master.action')} />
            </div>

            {/* Rows */}
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
                <div 
                  key={row.id} 
                  onClick={() => setSelectedRow(row)}
                  className={`grid grid-cols-[40px_minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(120px,1fr)_minmax(100px,1fr)_120px] border-b border-gray-200 hover:bg-indigo-50/50 cursor-pointer transition-colors ${selectedRow?.id === row.id ? 'bg-indigo-50/70 font-semibold' : 'bg-white'}`}
                >
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{index + 1}</div>
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.customerName}</div>
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.address}</div>
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.gstin}</div>
                  <div className="py-2.5 px-3 text-[13px] text-[#0d6efd] font-bold flex items-center">{row.mobileNo}</div>
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.balance}</div>
                  <div className="py-2.5 px-3 text-[13px] text-gray-700 flex items-center">{row.partyTags}</div>
                  <div className="py-2.5 px-3 flex items-center">
                    <div className="bg-[#ffc107] text-gray-900 px-2 py-0.5 rounded-[3px] text-[12px] font-bold">
                      {row.msgSent}
                    </div>
                  </div>
                  <div className="py-2.5 px-3 flex flex-wrap items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <ActionButton type="calendar" onClick={() => handleViewClick(row)} />
                    <ActionButton type="edit" onClick={() => handleEditClick(row)} />
                    <ActionButton type="delete" onClick={() => handleDeleteClick(row.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 px-4 text-center text-gray-500 text-[14px]">
                No customer details found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200">
          <span className="text-[12px] text-gray-500">Showing {filteredRows.length} of {rows.length} total</span>
        </div>

      </div>

      {/* View Modal (Followup) */}
      {viewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setViewModalOpen(false)}>
          <div 
            className="bg-white rounded-[4px] shadow-2xl flex flex-col w-full max-w-[650px] mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium text-[15px]">Followup</h3>
              <button onClick={() => setViewModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-6 h-6 font-bold text-[#dc3545]" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[13px] font-bold text-gray-800">Last Reason for Follow-up:</label>
                  <input 
                    type="text" 
                    className="border border-[#4F46E5] bg-[#e8e5ff] rounded-[4px] px-3 py-1.5 text-[14px] text-gray-800 focus:outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-[180px]">
                  <div className="flex justify-between items-center">
                    <label className="text-[13px] font-bold text-gray-800">Set Reminder Date:</label>
                    <Trash2 className="w-4 h-4 text-[#dc3545] cursor-pointer" />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      defaultValue="26-05-2026"
                      className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-800 w-full"
                    />
                    <CalendarDays className="w-4 h-4 text-gray-600 absolute right-3 top-2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <h4 className="text-[13px] font-bold text-gray-800">Follow-up History</h4>
                <div className="border border-gray-200 rounded-[4px] overflow-hidden">
                  <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                    <thead className="bg-[#f8f9fa]">
                      <tr>
                        <th className="py-2 px-3 text-[13px] font-bold text-[#495057] border-b border-gray-200 whitespace-nowrap">Date</th>
                        <th className="py-2 px-3 text-[13px] font-bold text-[#495057] border-b border-gray-200 whitespace-nowrap">Reason</th>
                        <th className="py-2 px-3 text-[13px] font-bold text-[#495057] border-b border-gray-200 text-right whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="3" className="py-8 bg-[#f4f6f9] border-b border-gray-200"></td>
                      </tr>
                    </tbody>
                  </table>
          </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={() => setViewModalOpen(false)}
                className="flex items-center gap-1.5 bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-bold transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Submit
              </button>
              <button onClick={() => setViewModalOpen(false)} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Party Master) */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setEditModalOpen(false)}>
          <div 
            className="bg-white rounded-[3px] shadow-2xl w-full sm:max-w-[750px] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#4F46E5] flex items-center justify-between">
              <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5">Party Master</h2>
              <div className="flex items-center">
                <button className="text-white hover:text-gray-200 focus:outline-none transition-colors px-3">
                  <Settings className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setEditModalOpen(false)} 
                  className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 bg-white overflow-y-auto max-h-[75vh]">
              <div className="flex flex-col gap-4">
                
                {/* Row 1: Party Name, Active, Due Days */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[14px] font-bold text-gray-800">Party Name</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${editData?.isActive !== false ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                          onClick={() => setEditData({...editData, isActive: editData?.isActive === false ? true : false})}
                        >
                          <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${editData?.isActive !== false ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                        </div>
                        <span className="text-[13px] font-bold text-gray-800 select-none">Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-gray-800">Due Days</span>
                        <input 
                          type="text" 
                          value={editData?.dueDays || '7'}
                          onChange={(e) => setEditData({...editData, dueDays: e.target.value})}
                          className="w-[60px] border border-gray-300 rounded-[3px] px-2 py-1 text-[13px] outline-none focus:border-[#4F46E5] text-center"
                        />
                      </div>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={editData?.customerName || editData?.name || ''}
                    onChange={(e) => setEditData({...editData, customerName: e.target.value, name: e.target.value})}
                    placeholder="Enter Name"
                    className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-bold"
                  />
                </div>
                
                {/* Row 2: Mobile Number & City */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Mobile Number</label>
                    <input 
                      type="text" 
                      value={editData?.mobileNo || editData?.mobile || ''}
                      onChange={(e) => setEditData({...editData, mobileNo: e.target.value, mobile: e.target.value})}
                      placeholder="Hint - Better to use WhatsApp Number"
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 relative">
                    <label className="text-[14px] font-bold text-gray-800">City</label>
                    <div className="relative">
                      <select
                        value={editData?.city || ''}
                        onChange={(e) => setEditData({...editData, city: e.target.value})}
                        className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                      >
                        <option value=""></option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <X className="w-3 h-3 text-gray-400 mr-1" />
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Party Tags */}
                <div className="flex flex-col gap-1 relative">
                  <label className="text-[14px] font-bold text-gray-800">Party Tags</label>
                  <div className="relative">
                    <select
                      value={editData?.partyTags || ''}
                      onChange={(e) => setEditData({...editData, partyTags: e.target.value})}
                      className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                    >
                      <option value="">Enter Tags</option>
                      <option value="Tag 1">Tag 1</option>
                      <option value="Tag 2">Tag 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* Row 4: Four Toggles */}
                <div className="flex justify-between items-center mt-4 px-2 sm:px-10">
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${editData?.toggles?.moreInfo ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setEditData({...editData, toggles: {...editData.toggles, moreInfo: !editData?.toggles?.moreInfo}})}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${editData?.toggles?.moreInfo ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">More Info</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${editData?.toggles?.wholeParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setEditData({...editData, toggles: {...editData.toggles, wholeParty: !editData?.toggles?.wholeParty}})}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${editData?.toggles?.wholeParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">Whole Party</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${editData?.toggles?.sezParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setEditData({...editData, toggles: {...editData.toggles, sezParty: !editData?.toggles?.sezParty}})}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${editData?.toggles?.sezParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">SEZ Party</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-[32px] h-[18px] rounded-full relative cursor-pointer transition-colors ${editData?.toggles?.focParty ? 'bg-[#0d6efd]' : 'bg-gray-300'}`}
                      onClick={() => setEditData({...editData, toggles: {...editData.toggles, focParty: !editData?.toggles?.focParty}})}
                    >
                      <div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${editData?.toggles?.focParty ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">FOC Party</span>
                  </div>
                </div>

                {/* Conditional More Info Fields */}
                {editData?.toggles?.moreInfo && (
                  <>
                    {/* Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[14px] font-bold text-gray-800">Address</label>
                      <input 
                        type="text" 
                        value={editData?.address || ''}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        placeholder="Enter Full Address"
                        className="w-full border border-gray-300 bg-[#a6cdec] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-bold"
                      />
                    </div>

                    {/* Pin Code, Gstin, Gst Applicable */}
                    <div className="grid grid-cols-[1.2fr_2fr_1.2fr] gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Pin Code</label>
                        <input 
                          type="text" 
                          value={editData?.pinCode || ''}
                          onChange={(e) => setEditData({...editData, pinCode: e.target.value})}
                          placeholder="Enter Pin Code"
                          className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Gstin</label>
                        <input 
                          type="text" 
                          value={editData?.gstin || ''}
                          onChange={(e) => setEditData({...editData, gstin: e.target.value})}
                          placeholder="Enter Gst Number"
                          className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 relative">
                        <label className="text-[14px] font-bold text-gray-800">Gst Applicable</label>
                        <div className="relative">
                          <select
                            value={editData?.gstApplicable || 'GST'}
                            onChange={(e) => setEditData({...editData, gstApplicable: e.target.value})}
                            className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                          >
                            <option value="GST">GST</option>
                            <option value="COMPOSITION">COMPOSITION</option>
                            <option value="UNREGISTERED">UNREGISTERED</option>
                            <option value="CONSUMER">CONSUMER</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* State, Email Address, Party Type */}
                    <div className="grid grid-cols-[1.2fr_2fr_1.2fr] gap-4">
                      <div className="flex flex-col gap-1 relative">
                        <label className="text-[14px] font-bold text-gray-800">State</label>
                        <div className="relative">
                          <select
                            value={editData?.state || 'Karnataka'}
                            onChange={(e) => setEditData({...editData, state: e.target.value})}
                            className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                          >
                            <option value="Karnataka">Karnataka</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Gujarat">Gujarat</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <X 
                              className="w-3 h-3 text-gray-400 mr-1 cursor-pointer pointer-events-auto" 
                              onClick={() => setEditData({...editData, state: ''})} 
                            />
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Email Address</label>
                        <input 
                          type="text" 
                          value={editData?.emailAddress || ''}
                          onChange={(e) => setEditData({...editData, emailAddress: e.target.value})}
                          placeholder="Enter Email Address"
                          className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 relative">
                        <label className="text-[14px] font-bold text-gray-800">Party Type</label>
                        <div className="relative">
                          <select
                            value={editData?.partyType || 'company'}
                            onChange={(e) => setEditData({...editData, partyType: e.target.value})}
                            className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5] appearance-none"
                          >
                            <option value="company">company</option>
                            <option value="retailer">retailer</option>
                            <option value="distributor">distributor</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Other Mobile No, Party Limit, Interest Rate/Month, Loyalty Points */}
                    <div className="grid grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Other Mobile No</label>
                        <input 
                          type="text" 
                          value={editData?.otherMobileNo || ''}
                          onChange={(e) => setEditData({...editData, otherMobileNo: e.target.value})}
                          placeholder="Enter Other Mobile"
                          className="w-full border border-gray-300 bg-white placeholder-gray-400 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Party Limit</label>
                        <input 
                          type="text" 
                          value={editData?.partyLimit || '0'}
                          onChange={(e) => setEditData({...editData, partyLimit: e.target.value})}
                          className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Interest Rate/Month</label>
                        <input 
                          type="text" 
                          value={editData?.interestRate || '0'}
                          onChange={(e) => setEditData({...editData, interestRate: e.target.value})}
                          className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-bold text-gray-800">Loyalty Points</label>
                        <input 
                          type="text" 
                          value={editData?.loyaltyPoints || '0'}
                          onChange={(e) => setEditData({...editData, loyaltyPoints: e.target.value})}
                          className="w-full border border-gray-300 bg-white rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-5 py-4 flex justify-end gap-2 border-t border-gray-100">
              <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-[7px] rounded-[3px] transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </button>
              <button 
                onClick={handleUpdate}
                className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
              >
                Update
              </button>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-[7px] rounded-[3px] text-[14px] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Merge Modal */}
      {mergeModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium text-[15px]">Party Correction</h3>
              <button onClick={() => setMergeModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-6 h-6 font-bold text-[#dc3545]" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-800">Incorrect Party Name</label>
                <select className="border border-[#4F46E5] bg-[#e8e5ff] rounded-[4px] px-3 py-2 text-[14px] text-gray-800 focus:outline-none shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] w-full font-bold">
                  <option value="">Select Name</option>
                  {rows.map(row => (
                    <option key={row.id} value={row.id}>{row.customerName}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-800">Correct Party Name</label>
                <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-2 text-[14px] text-gray-800 focus:outline-none focus:border-[#4F46E5] w-full">
                  <option value="">Select Name</option>
                  {rows.map(row => (
                    <option key={row.id} value={row.id}>{row.customerName}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={() => setMergeModalOpen(false)}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-bold transition-colors shadow-sm"
              >
                Merge
              </button>
              <button onClick={() => setMergeModalOpen(false)} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <PartyMasterModal 
        isOpen={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        defaultType="CUSTOMER" 
      />

    </div>
  );
}

const HeaderCell = ({ text, noSort }) => (
  <div className="py-2 px-3 flex items-center justify-between cursor-pointer group hover:bg-gray-50">
    <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-700">{text}</span>
    {!noSort && <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />}
  </div>
);

const ActionButton = ({ type, onClick }) => {
  const getStyle = () => {
    switch (type) {
      case 'calendar': return 'bg-[#28a745] hover:bg-[#218838]';
      case 'edit': return 'bg-[#4F46E5] hover:bg-[#4338ca]';
      case 'delete': return 'bg-[#dc3545] hover:bg-[#c82333]';
      default: return 'bg-gray-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'calendar': return <CalendarDays className="w-3.5 h-3.5 text-white" />;
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
