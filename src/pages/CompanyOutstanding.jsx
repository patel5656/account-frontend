import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Calendar, FileDown, Printer, CheckSquare, Square, Edit2, Trash2 } from 'lucide-react';

const SAMPLE_COMPANIES = [
  { id: 1, name: 'ABC Suppliers Pvt Ltd', invoiceNo: 'PUR-2011', dueAmount: 45000, balance: 45000, dueDate: '05-05-2026', status: 'Overdue' },
  { id: 2, name: 'Krishna Distributors', invoiceNo: 'PUR-2018', dueAmount: 18500, balance: 18500, dueDate: '15-05-2026', status: 'Pending' },
  { id: 3, name: 'Global Traders', invoiceNo: 'PUR-2025', dueAmount: 9200, balance: 0, dueDate: '22-05-2026', status: 'Paid' },
  { id: 4, name: 'Sunrise Wholesale', invoiceNo: 'PUR-2030', dueAmount: 31000, balance: 31000, dueDate: '01-05-2026', status: 'Overdue' },
  { id: 5, name: 'Modern Agencies', invoiceNo: 'PUR-2040', dueAmount: 7600, balance: 7600, dueDate: '28-05-2026', status: 'Pending' },
];

export function CompanyOutstanding() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(SAMPLE_COMPANIES);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');

  const filtered = rows.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(prev => { const n = new Set(prev); filtered.forEach(r => n.delete(r.id)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); filtered.forEach(r => n.add(r.id)); return n; });
    }
  };

  const toggleRow = (id) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const selectedCount = selected.size;

  const triggerBulkAction = (action) => {
    if (selectedCount === 0) { alert('Please select at least one company first.'); return; }
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const executeBulkAction = () => {
    setShowConfirm(false);
    if (confirmAction === 'delete') {
      setRows(prev => prev.filter(r => !selected.has(r.id)));
    } else if (confirmAction === 'status' && bulkStatus) {
      setRows(prev => prev.map(r => selected.has(r.id) ? { ...r, status: bulkStatus } : r));
    }
    setSelected(new Set());
    setConfirmAction(null);
  };

  const grandTotal = rows.filter(c => c.status !== 'Paid').reduce((s, c) => s + c.balance, 0);

  const getStatusBadge = (status) => {
    if (status === 'Paid') return 'bg-green-100 text-green-800';
    if (status === 'Overdue') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Company Outstanding</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => navigate('/admin/party-ledger/company_payment')}
              className="flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
              <Plus className="w-4 h-4" strokeWidth={3} /> Create New
            </button>
            <button onClick={() => alert('Exporting data...')}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors">
              <FileDown className="w-4 h-4" strokeWidth={2.5} /> Export
            </button>
            <button onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors">
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <div className="flex items-center flex-1 w-full max-w-[500px] bg-white border border-gray-300 rounded-[3px] overflow-hidden shadow-sm focus-within:border-blue-400">
              <div className="px-3 py-2 text-blue-500 bg-gray-50 border-r border-gray-300 flex-shrink-0">
                <FilterIcon className="w-4 h-4" />
              </div>
              <select className="px-2 py-1.5 text-[13px] outline-none bg-transparent text-gray-600 border-r border-gray-300 min-w-[110px]">
                <option>Party Name</option>
                <option>Invoice No</option>
              </select>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search company or invoice..."
                className="flex-1 min-w-0 px-3 py-1.5 text-[13px] outline-none bg-[#add8e6] text-[#0056b3] placeholder-[#0056b3]" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-700 shadow-sm">
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Paid">Paid</option>
              </select>
              <div className="flex items-center border border-gray-300 rounded-[3px] overflow-hidden shadow-sm">
                <input type="date" defaultValue="2026-05-23"
                  className="w-[130px] border-0 px-2 py-1.5 text-[13px] outline-none text-gray-600 bg-white" />
                <button className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 text-[13px] font-medium transition-colors border-l border-gray-300">Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedCount > 0 && (
          <div className="bg-indigo-50 border-b border-indigo-200 px-4 py-2 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-bold text-[#4F46E5]">{selectedCount} company record{selectedCount > 1 ? 's' : ''} selected</span>
            <div className="h-4 w-[1px] bg-indigo-200 mx-1 hidden sm:block"></div>
            <button onClick={() => setShowBulkEdit(true)}
              className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold transition-colors shadow-sm">
              <Edit2 className="w-3.5 h-3.5" /> Bulk Status Update
            </button>
            <button onClick={() => triggerBulkAction('delete')}
              className="flex items-center gap-1.5 bg-[#dc3545] hover:bg-[#c82333] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold transition-colors shadow-sm">
              <Trash2 className="w-3.5 h-3.5" /> Delete Selected
            </button>
            <button onClick={() => setSelected(new Set())} className="ml-auto text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
              Clear Selection
            </button>
          </div>
        )}

        {/* Grand Total */}
        <div className="bg-[#343a40] text-white text-center border-b border-gray-600 py-2">
          <div className="font-bold text-[14px]">
            GRAND TOTAL PAYABLE : ₹{grandTotal.toLocaleString('en-IN')}
            <span className="ml-3 text-[12px] font-normal text-gray-300">
              ({rows.filter(c => c.status !== 'Paid').length} pending payments)
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0">
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[13px]">
                <th className="py-2 px-3 font-medium w-8">
                  <button onClick={toggleAll} className="text-gray-500 hover:text-indigo-600">
                    {allSelected ? <CheckSquare className="w-4 h-4 text-[#4F46E5]" /> : <Square className="w-4 h-4" />}
                  </button>
                </th>
                <th className="py-2 px-3 font-medium">#</th>
                <th className="py-2 px-3 font-medium">Company Name</th>
                <th className="py-2 px-3 font-medium">Invoice No</th>
                <th className="py-2 px-3 font-medium text-right">Due Amount</th>
                <th className="py-2 px-3 font-medium text-right">Balance</th>
                <th className="py-2 px-3 font-medium">Due Date</th>
                <th className="py-2 px-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" className="py-12 text-center text-gray-400 text-[14px]">No outstanding records found.</td></tr>
              ) : filtered.map((c, idx) => (
                <tr key={c.id} className={`border-b border-gray-100 text-[13px] transition-colors ${selected.has(c.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                  <td className="py-2.5 px-3">
                    <button onClick={() => toggleRow(c.id)} className="text-gray-400 hover:text-indigo-600">
                      {selected.has(c.id) ? <CheckSquare className="w-4 h-4 text-[#4F46E5]" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-bold text-[#4F46E5]">{c.name}</td>
                  <td className="py-2.5 px-3 text-gray-700 font-mono text-[12px]">{c.invoiceNo}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-red-600">₹{c.dueAmount.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-bold">
                    {c.status === 'Paid' ? <span className="text-green-600">₹0</span> : `₹${c.balance.toLocaleString('en-IN')}`}
                  </td>
                  <td className="py-2.5 px-3 text-gray-600">{c.dueDate}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusBadge(c.status)}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Status Update Modal */}
      {showBulkEdit && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[380px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#4F46E5] px-4 py-2.5 flex items-center justify-between">
              <h3 className="text-white font-bold text-[14px] flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Bulk Status Update — {selectedCount} Records
              </h3>
              <button onClick={() => setShowBulkEdit(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-800">New Payment Status</label>
                <select value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}
                  className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-indigo-500 bg-white">
                  <option value="">— Select Status —</option>
                  <option value="Paid">Mark as Paid</option>
                  <option value="Pending">Mark as Pending</option>
                  <option value="Overdue">Mark as Overdue</option>
                </select>
              </div>
            </div>
            <div className="bg-[#f8f9fa] px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
              <button onClick={() => setShowBulkEdit(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-[3px] text-[13px] font-medium transition-colors">Cancel</button>
              <button onClick={() => {
                if (!bulkStatus) { alert('Please select a status.'); return; }
                setShowBulkEdit(false); setConfirmAction('status'); setShowConfirm(true);
              }} className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-5 py-2 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm">
                Apply to {selectedCount} Records
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[380px] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className={`px-4 py-2.5 ${confirmAction === 'delete' ? 'bg-[#dc3545]' : 'bg-[#4F46E5]'}`}>
              <h3 className="text-white font-bold text-[14px]">⚠️ Confirm Bulk Action</h3>
            </div>
            <div className="p-5">
              <p className="text-[14px] text-gray-700 mb-2">
                You are about to <strong>{confirmAction === 'delete' ? 'delete' : `set status to "${bulkStatus}"`}</strong> for <strong>{selectedCount} record(s)</strong>.
              </p>
              {confirmAction === 'delete' && (
                <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded p-2 font-medium">
                  ⚠️ Deleted records cannot be recovered.
                </p>
              )}
              <p className="text-[12px] text-gray-400 mt-2">This action will be logged in the audit history.</p>
            </div>
            <div className="flex justify-end gap-2 px-5 pb-4">
              <button onClick={() => { setShowConfirm(false); setConfirmAction(null); }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-[3px] text-[13px] font-medium transition-colors">Cancel</button>
              <button onClick={executeBulkAction}
                className={`text-white px-5 py-2 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm ${confirmAction === 'delete' ? 'bg-[#dc3545] hover:bg-[#c82333]' : 'bg-[#4F46E5] hover:bg-[#4338ca]'}`}>
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
