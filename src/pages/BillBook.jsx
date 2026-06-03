import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search,
  ArrowDownAZ,
  Printer,
  FileDown,
  Eye,
  Edit,
  FileText
} from 'lucide-react';
import { cn } from '../utils';

export function BillBook() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [billNumberSearch, setBillNumberSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dummy data for visual representation
  const [invoices, setInvoices] = useState([
    { id: 1, billNo: 'BB-1001', invoiceNo: 'INV-2026-001', customerName: 'John Doe', date: '2026-06-01', totalAmount: 5000, paymentStatus: 'Paid', dueAmount: 0 },
    { id: 2, billNo: 'BB-1002', invoiceNo: 'INV-2026-002', customerName: 'Acme Corp', date: '2026-06-02', totalAmount: 12500, paymentStatus: 'Partial', dueAmount: 5000 },
    { id: 3, billNo: 'BB-1003', invoiceNo: 'INV-2026-003', customerName: 'Jane Smith', date: '2026-06-03', totalAmount: 3200, paymentStatus: 'Unpaid', dueAmount: 3200 },
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
             <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
             <h2 className="text-white text-[16px] font-medium tracking-wide">
               Bill Book (Sales Bills)
             </h2>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-gray-200 flex flex-wrap gap-4 items-end bg-[#fdfdfd]">
          {/* Customer Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[13px] font-bold text-gray-800 mb-1">Customer Search</label>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Customer Name"
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 pr-8 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white shadow-sm"
              />
              <Search className="absolute right-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Bill Number Search */}
          <div className="w-[180px]">
            <label className="block text-[13px] font-bold text-gray-800 mb-1">Bill / Invoice No.</label>
            <input 
              type="text"
              value={billNumberSearch}
              onChange={(e) => setBillNumberSearch(e.target.value)}
              placeholder="Search Bill No."
              className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white shadow-sm"
            />
          </div>

          {/* Date Filter */}
          <div className="w-[150px]">
             <label className="block text-[13px] font-bold text-gray-800 mb-1">Date</label>
             <select 
               value={dateFilter}
               onChange={(e) => setDateFilter(e.target.value)}
               className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white shadow-sm"
             >
               <option>Today</option>
               <option>Yesterday</option>
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
               <option>This Month</option>
               <option>Custom Range</option>
             </select>
          </div>

          {/* Status Filter */}
          <div className="w-[150px]">
             <label className="block text-[13px] font-bold text-gray-800 mb-1">Status</label>
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white shadow-sm"
             >
               <option>All</option>
               <option>Paid</option>
               <option>Partial</option>
               <option>Unpaid</option>
             </select>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white px-3 py-1.5 rounded-[3px] text-[14px] transition-colors shadow-sm h-[34px]">
              <Search className="w-4 h-4" strokeWidth={3} />
              Search
            </button>
            <button className="flex items-center justify-center bg-[#6c757d] hover:bg-[#5a6268] text-white px-2.5 py-1.5 rounded-[3px] transition-colors shadow-sm h-[34px]">
              <ArrowDownAZ className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Totals Table Header */}
        <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-3 text-center py-2 px-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL INVOICES:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">{invoices.length}</span>
          </div>
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL AMOUNT:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5 text-[#28a745]">₹{invoices.reduce((acc, inv) => acc + inv.totalAmount, 0).toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-bold tracking-wider">DUE AMOUNT:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5 text-[#dc3545]">₹{invoices.reduce((acc, inv) => acc + inv.dueAmount, 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto bg-white border-t border-gray-200">
          <div className="table-scroll w-full overflow-x-auto print:overflow-visible">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8f9fa] sticky top-0 shadow-sm z-0">
                <tr>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r w-[50px] text-center">#</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap">Bill No</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap">Invoice No</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap">Customer Name</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap">Invoice Date</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap text-right">Total Amount</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r w-[100px] text-center">Status</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 border-r whitespace-nowrap text-right">Due Amount</th>
                  <th className="px-3 py-2.5 text-[13px] font-bold text-gray-700 border-b border-gray-200 text-center w-[160px] print:hidden">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => (
                  <tr key={inv.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
                    <td className="px-3 py-2.5 text-[13px] text-gray-800 border-r border-gray-100 text-center">{index + 1}</td>
                    <td className="px-3 py-2.5 text-[13px] text-gray-800 font-medium border-r border-gray-100 whitespace-nowrap">{inv.billNo}</td>
                    <td className="px-3 py-2.5 text-[13px] text-gray-800 border-r border-gray-100 whitespace-nowrap">{inv.invoiceNo}</td>
                    <td className="px-3 py-2.5 text-[13px] text-[#4F46E5] font-bold border-r border-gray-100 whitespace-nowrap">{inv.customerName}</td>
                    <td className="px-3 py-2.5 text-[13px] text-gray-800 border-r border-gray-100 whitespace-nowrap">{inv.date}</td>
                    <td className="px-3 py-2.5 text-[14px] font-bold text-gray-900 border-r border-gray-100 text-right">₹{inv.totalAmount.toLocaleString()}</td>
                    <td className="px-3 py-2.5 border-r border-gray-100 text-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded-[3px] text-[11px] font-bold uppercase tracking-wider",
                        inv.paymentStatus === 'Paid' ? "bg-green-100 text-green-700 border border-green-200" :
                        inv.paymentStatus === 'Partial' ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                        "bg-red-100 text-red-700 border border-red-200"
                      )}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td className={cn(
                      "px-3 py-2.5 text-[14px] font-bold border-r border-gray-100 text-right",
                      inv.dueAmount > 0 ? "text-[#dc3545]" : "text-gray-500"
                    )}>
                      ₹{inv.dueAmount.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-center print:hidden">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => navigate('/admin/sales-invoice')}
                          title="View" 
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate('/admin/sales-invoice')}
                          title="Edit" 
                          className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handlePrint}
                          title="Print" 
                          className="p-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handlePrint}
                          title="Download PDF" 
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <FileDown className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-gray-500 font-medium">
                      No invoices found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
