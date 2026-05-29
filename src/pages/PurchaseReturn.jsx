import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Plus, 
  BarChart2,
  FileText,
  Search,
  SlidersHorizontal,
  Calendar,
  ShoppingCart,
  Coins,
  BadgeDollarSign,
  Calculator,
  Info
} from 'lucide-react';

export function PurchaseReturn() {
  const navigate = useNavigate();
  const [companyToggle, setCompanyToggle] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [loadingSheetModalOpen, setLoadingSheetModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tableData = [
    { id: 1, invoiceNo: 'PR-2026-001', name: 'ABC Suppliers Pvt Ltd', date: '23-May-2026', amount: '₹15,000', status: 'COMPLETED' },
    { id: 2, invoiceNo: 'PR-2026-002', name: 'XYZ Electronics', date: '22-May-2026', amount: '₹8,500', status: 'PENDING' }
  ];

  const filteredData = tableData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">Purchase Return Summary</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setCollectionModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-sm"
            >
              <BarChart2 className="w-4 h-4" />
              Today's Collection
            </button>
            <button 
              onClick={() => setLoadingSheetModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" strokeWidth={2.5} />
              Loading Sheet
            </button>
            <button 
              onClick={() => navigate('/admin/create_invoices/company_purchase')}
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

        {/* Filter Section */}
        <div className="p-3 bg-white border-b border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <div className="flex flex-wrap items-center gap-2">
                <div 
                  onClick={() => setCompanyToggle(!companyToggle)}
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${companyToggle ? 'bg-[#007bff]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-[2px] w-3 h-3 bg-white rounded-full transition-all shadow-sm ${companyToggle ? 'left-[18px]' : 'left-[2px]'}`} />
                </div>
                <span className="text-[13px] font-bold text-gray-800">Company Name</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold text-gray-800">Date</span>
                <span className="text-[12px] font-medium text-blue-500">(23-May-2026)</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Supplier/Customer Name..."
                  className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800 placeholder-gray-400 focus:border-[#4F46E5]"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800 w-full">
                  <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                </select>
                <button className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-sm whitespace-nowrap">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[3px] transition-colors shadow-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Totals Header */}
        <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-3 text-center border-b border-gray-600 py-1.5">
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">TOTAL AMT:</span>
             <span className="font-bold text-[14px]">0</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">TOTAL PAID:</span>
             <span className="font-bold text-[14px]">0</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">BALANCE:</span>
             <span className="font-bold text-[14px]">0</span>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white overflow-auto relative">
          <div className="table-scroll w-full overflow-x-auto min-h-full">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8f9fa] sticky top-0 shadow-sm z-10">
                <tr>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 w-[50px]">#</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Return Invoice No</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-[#4F46E5] border-b border-gray-200">Supplier/Customer Name</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200">Amount</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 text-center">Status</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-700 border-b border-gray-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-[13px] text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{row.invoiceNo}</td>
                      <td className="px-4 py-3 text-[14px] font-bold text-gray-900">{row.name}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-600">{row.date}</td>
                      <td className="px-4 py-3 text-[13px] font-bold text-gray-800">{row.amount}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold tracking-wide ${row.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-[#007bff] hover:text-[#0056b3] font-medium text-[13px] mr-3">View</button>
                        <button className="text-gray-500 hover:text-gray-700 font-medium text-[13px]">Print</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-[14px]">No results found matching "{searchQuery}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Collection Report Modal */}
      {collectionModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#4F46E5] px-4 py-3 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <BarChart2 className="w-5 h-5 text-white" strokeWidth={3} />
                <h3 className="text-white font-medium text-[16px]">Collection Report</h3>
              </div>
              <button onClick={() => setCollectionModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-5 h-5 font-bold text-white" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 flex flex-col gap-4">
              
              {/* Select Period and Date */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <label className="text-[14px] font-bold text-gray-800">Select Period</label>
                  <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-600 outline-none w-[200px]">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 bg-[#4F46E5] text-white px-3 py-1.5 rounded-[4px] text-[13px] font-bold">
                  <Calendar className="w-4 h-4" />
                  23-May-2026
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Today's Sales */}
                <div className="bg-[#4F46E5] rounded-[4px] p-4 text-white relative overflow-hidden">
                  <div className="flex flex-col relative z-10">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <BarChart2 className="w-5 h-5" strokeWidth={2.5} />
                      <span className="font-bold text-[15px]">Today's Sales</span>
                    </div>
                    <span className="text-[28px] font-bold leading-none">0</span>
                  </div>
                  <ShoppingCart className="w-16 h-16 absolute right-[-10px] bottom-[-10px] opacity-30 rotate-12" />
                  <ShoppingCart className="w-10 h-10 absolute right-4 top-1/2 -translate-y-1/2 opacity-100" />
                </div>
                
                {/* Cash Sales */}
                <div className="bg-[#28a745] rounded-[4px] p-4 text-white relative overflow-hidden">
                  <div className="flex flex-col relative z-10">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="bg-white text-[#28a745] px-1 rounded-sm text-[10px] font-bold">₹</span>
                      <span className="font-bold text-[15px]">Cash Sales</span>
                    </div>
                    <span className="text-[28px] font-bold leading-none">0</span>
                  </div>
                  <Coins className="w-10 h-10 absolute right-4 top-1/2 -translate-y-1/2 opacity-100" />
                </div>
                
                {/* Credit Sales */}
                <div className="bg-[#dc3545] rounded-[4px] p-4 text-white relative overflow-hidden">
                  <div className="flex flex-col relative z-10">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                      <span className="font-bold text-[15px]">Credit Sales</span>
                    </div>
                    <span className="text-[28px] font-bold leading-none">0</span>
                  </div>
                  <BadgeDollarSign className="w-10 h-10 absolute right-4 top-1/2 -translate-y-1/2 opacity-100" />
                </div>
              </div>

              {/* Empty Divider */}
              <div className="h-[20px] rounded-full border border-gray-200 mt-2 mb-2 w-full"></div>

              {/* Total Collection Banner */}
              <div className="bg-[#28a745] rounded-[4px] px-4 py-3 text-white flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Calculator className="w-5 h-5" strokeWidth={2.5} />
                  <span className="font-bold text-[15px] uppercase">Total Collection</span>
                </div>
                <div className="font-bold text-[22px]">
                  ₹0
                </div>
              </div>

              {/* Empty State message */}
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white">
                  <Info className="w-6 h-6" strokeWidth={3} />
                </div>
                <p className="text-[15px]">No sales or payment data found for selected date range</p>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-4 py-3 flex justify-end">
              <button 
                onClick={() => setCollectionModalOpen(false)} 
                className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm"
              >
                <X className="w-4 h-4 font-bold" strokeWidth={3} />
                Close
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Loading Sheet Modal */}
      {loadingSheetModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-[#ffc107] px-4 py-3 flex items-center justify-between">
              <h3 className="text-gray-900 font-medium text-[16px]">Select Invoices for Loading Sheet</h3>
              <button onClick={() => setLoadingSheetModalOpen(false)} className="text-[#dc3545] hover:text-red-700 transition-colors">
                <X className="w-7 h-7 font-bold" strokeWidth={4} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              {/* Actions row */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[14px] text-gray-700">Select Invoices</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="border border-[#007bff] text-[#007bff] hover:bg-blue-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
                    Select All
                  </button>
                  <button className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors">
                    Deselect All
                  </button>
                </div>
              </div>
              
              {/* Filter */}
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-[14px] font-bold text-gray-800">Filter by Salesman</label>
                <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] text-gray-500 outline-none w-full shadow-sm bg-white">
                  <option>Select Salesman</option>
                </select>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-auto border border-gray-200">
                <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                  <thead className="bg-[#343a40] text-white sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-[14px] font-bold w-[40px] border-r border-gray-600 whitespace-nowrap">#</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Invoice No</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Party Name</th>
                      <th className="px-3 py-2 text-[14px] font-bold border-r border-gray-600 whitespace-nowrap">Date</th>
                      <th className="px-3 py-2 text-[14px] font-bold whitespace-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Empty table rows */}
                  </tbody>
                </table>
          </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-between items-center">
              <div className="text-[14px] text-gray-600">
                Selected: 0 of 0
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setLoadingSheetModalOpen(false)} 
                  className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm">
                  Send WhatsApp PDFs
                </button>
                <button className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm">
                  Generate Loading Sheet
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
