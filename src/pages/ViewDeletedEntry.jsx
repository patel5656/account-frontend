import React, { useState, useEffect } from 'react';
import { cn } from '../utils';
import apiClient from '../api/apiClient';

export function ViewDeletedEntry() {
  const [searchByActive, setSearchByActive] = useState(false);
  const [dateFilter, setDateFilter] = useState('Today');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deletedEntries, setDeletedEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchDeletedEntries();
  }, []);

  const fetchDeletedEntries = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/recycle-bin');
      if (res.data.success) {
        setDeletedEntries(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching deleted entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id, type) => {
    try {
      const res = await apiClient.post(`/recycle-bin/restore/${type}/${id}`);
      if (res.data.success) {
        alert('Entry restored successfully!');
        fetchDeletedEntries();
      }
    } catch (error) {
      console.error('Error restoring entry:', error);
      alert('Failed to restore entry.');
    }
  };

  const handlePermanentDelete = async () => {
    if (selectedIds.length === 0) return alert('Select entries to delete permanently.');
    if (!window.confirm('Are you sure you want to permanently delete selected entries?')) return;

    try {
      for (const id of selectedIds) {
        const entry = deletedEntries.find(e => e.id === id);
        if (entry) {
          await apiClient.delete(`/recycle-bin/permanent/${entry.type}/${id}`);
        }
      }
      alert('Entries permanently deleted!');
      setSelectedIds([]);
      fetchDeletedEntries();
    } catch (error) {
      console.error('Error deleting entries:', error);
      alert('Failed to delete entries.');
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(deletedEntries.map(e => e.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-60px)] flex flex-col p-4">
      {/* Top Container with Border */}
      <div className="border border-gray-300 rounded-[3px] bg-white flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-[#4F46E5] px-4 py-2 text-white">
          <h2 className="text-[14px] font-medium tracking-wide">Deleted Entry</h2>
        </div>

        {/* Filter Section */}
        <div className="p-3 border-b border-gray-300 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-end gap-6 w-full sm:w-auto">
            
            {/* Search by */}
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <div 
                  onClick={() => setSearchByActive(!searchByActive)}
                  className={cn(
                    "w-8 h-[16px] rounded-full relative cursor-pointer transition-colors duration-200 border border-gray-300",
                    searchByActive ? "bg-[#007bff]" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 bg-white rounded-full absolute top-[0px] shadow-sm transition-all duration-200",
                    searchByActive ? "right-[1px]" : "left-[1px]"
                  )}></div>
                </div>
                <label className="text-[13px] font-bold text-gray-800">Search by :</label>
              </div>
              <select className="w-full sm:w-[300px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-[#f8f9fa] appearance-none">
                <option></option>
              </select>
              <div className="relative -mt-6 right-2 pointer-events-none flex justify-end">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <div className="flex justify-between items-center w-full sm:w-[250px]">
                <label className="text-[13px] font-bold text-gray-800">Date</label>
              </div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full sm:w-[250px] h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-800 bg-white"
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="Last Week">Last Week</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateFilter === 'Custom' && (
              <div className="flex items-end gap-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-gray-800">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="h-[30px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-800 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Search Button */}
            <button className="bg-[#007bff] hover:bg-[#0069d9] text-white px-4 h-[30px] rounded-[3px] text-[13px] font-medium transition-colors">
              Search
            </button>
          </div>

          {/* Permanently Delete Button */}
          <button 
            onClick={handlePermanentDelete}
            className="bg-[#f06e7b] hover:bg-[#e45a68] text-white px-4 h-[30px] rounded-[3px] text-[13px] font-medium transition-colors"
          >
            Permanently Delete
          </button>
        </div>

        {/* Table Area */}
        <div className="">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 bg-white">
                <th className="p-2 border-r border-gray-200 w-8 text-center whitespace-nowrap">
                  <input type="checkbox" className="w-3.5 h-3.5 cursor-pointer" onChange={toggleSelectAll} checked={deletedEntries.length > 0 && selectedIds.length === deletedEntries.length} />
                </th>
                <th className="p-2 border-r border-gray-200 text-left text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Date</th>
                <th className="p-2 border-r border-gray-200 text-left text-[12px] font-bold text-gray-800 w-[120px] whitespace-nowrap">Voucher No</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 whitespace-nowrap">Particular</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Voucher Type</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Debit</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[90px] whitespace-nowrap">Payment In</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Payment Out</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Discount</th>
                <th className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800 w-[100px] whitespace-nowrap">Deleted On</th>
                <th className="p-2 text-center text-[12px] font-bold text-gray-800 w-[80px] whitespace-nowrap">Restore</th>
              </tr>
            </thead>
            <tbody>
              {/* Totals Row */}
              <tr className="border-b border-gray-300 bg-white">
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">TOTAL</td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">
                  {deletedEntries.reduce((acc, curr) => acc + (curr.debit || 0), 0)}
                </td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">
                  {deletedEntries.reduce((acc, curr) => acc + (curr.paymentIn || 0), 0)}
                </td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">
                  {deletedEntries.reduce((acc, curr) => acc + (curr.paymentOut || 0), 0)}
                </td>
                <td className="p-2 border-r border-gray-200 text-center text-[12px] font-bold text-gray-800">
                  {deletedEntries.reduce((acc, curr) => acc + (curr.discount || 0), 0)}
                </td>
                <td className="p-2 border-r border-gray-200"></td>
                <td className="p-2"></td>
              </tr>
              {loading ? (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-[13px] text-gray-500">Loading deleted entries...</td>
                </tr>
              ) : deletedEntries.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-[13px] text-gray-500">No deleted entries found.</td>
                </tr>
              ) : (
                deletedEntries.map((entry, i) => (
                  <tr key={`${entry.type}-${entry.id}`} className="border-b border-gray-200/50 bg-white h-[35px] hover:bg-gray-50">
                    <td className="border-r border-gray-200/50 text-center">
                      <input 
                        type="checkbox" 
                        className="w-3.5 h-3.5 cursor-pointer"
                        checked={selectedIds.includes(entry.id)}
                        onChange={() => toggleSelect(entry.id)}
                      />
                    </td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px]">{entry.voucherNo}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.particular}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.voucherType}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.debit}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.paymentIn}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.paymentOut}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center">{entry.discount}</td>
                    <td className="border-r border-gray-200/50 px-2 text-[12px] text-center whitespace-nowrap">{new Date(entry.deletedOn).toLocaleDateString()}</td>
                    <td className="px-2 text-center">
                      <button 
                        onClick={() => handleRestore(entry.id, entry.type)}
                        className="bg-[#28a745] hover:bg-[#218838] text-white text-[11px] font-bold px-2 py-0.5 rounded-[3px] transition-colors"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
