import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Printer, 
  Plus, 
  X, 
  Search,
  ArrowDownAZ,
  Calendar,
  Info,
  Banknote,
  Download,
  Upload,
  Layers,
  ArrowDownToLine,
  ArrowUpFromLine,
  Building,
  Users,
  FileText
} from 'lucide-react';
import { cn } from '../utils';
import { useSettings } from '../context/SettingsContext';

export function SalesInvoiceSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatAmount, currentCurrency } = useSettings();
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [loadingSheetModalOpen, setLoadingSheetModalOpen] = useState(false);
  const [reportDate, setReportDate] = useState("2026-05-27");
  const dateInputRef = useRef(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className={cn(
          "px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
          location.pathname.includes('customer_challan_invoice') ? "bg-[#17a2b8]" : "bg-[#4F46E5]"
        )}>
          <h2 className="text-white text-[16px] font-medium tracking-wide">
            {location.pathname.includes('customer_sale_order') ? 'Sales Order Summary' : 
             location.pathname.includes('customer_challan_invoice') ? 'Customer Challan Summary' : 
             location.pathname.includes('customer_sale') ? 'Customer Invoice Summary' :
             'Sales Invoice Summary'}
          </h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setCollectionModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
              Today's Collection
            </button>
            <button 
              onClick={() => setLoadingSheetModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors"
            >
              <Printer className="w-4 h-4" strokeWidth={2.5} />
              Loading Sheet
            </button>
            <button 
              onClick={() => navigate(
                location.pathname.includes('customer_sale_order') ? '/admin/sales-order-invoice' : 
                location.pathname.includes('customer_challan_invoice') ? '/admin/customer-challan-creation' :
                location.pathname.includes('customer_sale') ? '/admin/customer-invoice-creation' :
                '/admin/sales-invoice'
              )}
              className="flex items-center gap-1.5 bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              Create New
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1 rounded-[3px] transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 w-full md:w-auto relative">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <div className="w-8 h-[18px] bg-gray-300 rounded-full relative cursor-pointer flex items-center">
                <div className="w-[14px] h-[14px] bg-white rounded-full absolute left-[2px] shadow-sm"></div>
              </div>
              <span className="text-[13px] font-bold text-gray-800">Customer Name</span>
            </div>
            <div className="relative flex items-center">
              <input 
                type="text"
                list="customer-names"
                placeholder="Select or Search Name"
                className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 pr-8 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white"
              />
              <Search className="absolute right-2.5 w-4 h-4 text-gray-400" />
            </div>
            <datalist id="customer-names">
              <option value="John Doe" />
              <option value="Jane Smith" />
              <option value="Acme Corp" />
              <option value="Global Industries" />
              <option value="Tech Solutions Ltd" />
            </datalist>
          </div>

          <div className="flex flex-wrap items-end gap-2 w-full md:w-auto">
             <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[13px] font-bold text-gray-800 invisible">Date</span>
                   <span className="text-[11px] font-bold text-[#4F46E5]">(23-May-2026)</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                   <span className="text-[13px] font-bold text-gray-800">Date</span>
                   <select className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#4F46E5] bg-white">
                     <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                   </select>
                </div>
             </div>

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
        <div className="bg-[#343a40] text-white flex flex-col sm:grid sm:grid-cols-3 text-center py-2 px-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL AMT:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">{formatAmount(0)}</span>
          </div>
          <div className="flex flex-col items-center border-r border-gray-600">
            <span className="text-[15px] font-bold tracking-wider">TOTAL PAID:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">{formatAmount(0)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-bold tracking-wider">BALANCE:</span>
            <span className="text-[18px] font-bold leading-none mt-0.5">{formatAmount(0)}</span>
          </div>
        </div>

        {/* Empty Area for table body */}
        <div className="flex-1 bg-white">
          {/* Table rows would go here */}
        </div>
      </div>

      {/* Collection Report Modal */}
      {collectionModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-300">
            
            {/* Modal Header */}
            <div className="bg-[#17a2b8] px-4 py-2 flex items-center justify-between shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <BarChart2 className="w-5 h-5 text-white" strokeWidth={3} />
                <h3 className="text-white font-medium text-[16px]">Collection Report</h3>
              </div>
              <button onClick={() => setCollectionModalOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                <X className="w-6 h-6 font-bold text-white" strokeWidth={3} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 flex-1 overflow-auto flex flex-col gap-4 bg-[#fbfcfc]">
              
              {/* Select Period and Date */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-700 outline-none w-[150px] shadow-sm bg-white">
                  <option>All</option>
                  <option>Retailsale</option>
                  <option>Wholesale</option>
                </select>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[13px] font-bold text-gray-700">Select Period</label>
                    <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-700 outline-none w-[150px] shadow-sm bg-white">
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Month</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      ref={dateInputRef}
                      type="date"
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      className="absolute w-0 h-0 opacity-0 -z-10"
                    />
                    <button 
                      onClick={() => {
                        try {
                          dateInputRef.current?.showPicker();
                        } catch (e) {
                          dateInputRef.current?.focus();
                        }
                      }}
                      className="flex flex-wrap items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338ca] transition-colors text-white px-3 py-1.5 rounded-[4px] text-[13px] font-bold shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      {formatDisplayDate(reportDate)}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metric Cards (Top Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#17a2b8] rounded-[4px] p-2 px-3 text-white flex flex-col shadow-sm">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 opacity-90">
                    <BarChart2 className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[14px]">Today's Sales</span>
                  </div>
                  <span className="text-[18px] font-bold">{formatAmount(0)}</span>
                </div>
                
                <div className="bg-[#28a745] rounded-[4px] p-3 text-white flex flex-col shadow-sm">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 opacity-90">
                    <Banknote className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[14px]">Cash Sales</span>
                  </div>
                  <span className="text-[18px] font-bold">{formatAmount(0)}</span>
                </div>
                
                <div className="bg-[#dc3545] rounded-[4px] p-3 text-white flex flex-col shadow-sm">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1 opacity-90">
                    <Layers className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[14px]">Credit Sales</span>
                  </div>
                  <span className="text-[18px] font-bold">{formatAmount(0)}</span>
                </div>
              </div>

              {/* Money In & Money Out Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                
                {/* MONEY IN */}
                <div className="border border-[#c3e6cb] rounded-[4px] bg-white overflow-hidden shadow-sm flex flex-col">
                  <div className="bg-[#d4edda] text-[#155724] px-3 py-2 flex items-center gap-2 border-b border-[#c3e6cb]">
                    <ArrowDownToLine className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[14px] tracking-wide">MONEY IN</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col p-2 gap-2 text-[13.5px] text-gray-700">
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <Banknote className="w-4 h-4 text-[#28a745]" />
                         <span>Total Cash Sale</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <Banknote className="w-4 h-4 text-[#28a745]" />
                         <span>Total Credit Recovery</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <Banknote className="w-4 h-4 text-[#28a745]" />
                         <span>Total Other Income</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                       <div className="flex items-center gap-2">
                         <Download className="w-4 h-4 text-[#28a745]" />
                         <span>Total Payment In</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#28a745] text-white px-3 py-2.5 flex items-center justify-between mt-auto">
                    <span className="font-bold text-[14px] uppercase tracking-wide">Total Money In</span>
                    <span className="font-bold text-[15px]">{formatAmount(0)}</span>
                  </div>
                </div>

                {/* MONEY OUT */}
                <div className="border border-[#f5c6cb] rounded-[4px] bg-white overflow-hidden shadow-sm flex flex-col">
                  <div className="bg-[#f8d7da] text-[#721c24] px-3 py-2 flex items-center gap-2 border-b border-[#f5c6cb]">
                    <ArrowUpFromLine className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[14px] tracking-wide">MONEY OUT</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col p-2 gap-2 text-[13.5px] text-gray-700">
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <Building className="w-4 h-4 text-[#dc3545]" />
                         <span>Total Company Paid</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-[#dc3545]" />
                         <span>Total Employee Paid</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                       <div className="flex items-center gap-2">
                         <FileText className="w-4 h-4 text-[#dc3545]" />
                         <span>Total Expenses Paid</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                       <div className="flex items-center gap-2">
                         <Upload className="w-4 h-4 text-[#dc3545]" />
                         <span>Total Payment Out</span>
                       </div>
                       <span className="font-bold text-gray-800">{formatAmount(0)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#dc3545] text-white px-3 py-2.5 flex items-center justify-between mt-auto">
                    <span className="font-bold text-[14px] uppercase tracking-wide">Total Money Out</span>
                    <span className="font-bold text-[15px]">{formatAmount(0)}</span>
                  </div>
                </div>

              </div>

              {/* Net Collection Bar */}
              <div className="bg-[#2eb85c] rounded-[4px] p-3 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 shadow-sm gap-2">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <Calculator className="w-5 h-5 opacity-90" />
                    <span className="font-bold text-[16px] tracking-wide uppercase">Net Collection</span>
                  </div>
                  <span className="text-[12px] opacity-90 mt-0.5">(Total Money In {formatAmount(0)} - Total Money Out {formatAmount(0)})</span>
                </div>
                <div className="font-bold text-[22px]">
                  {formatAmount(0)}
                </div>
              </div>

              {/* Accounts Collection */}
              <div className="flex flex-col mt-2">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Banknote className="w-5 h-5" strokeWidth={2} />
                  <span className="font-bold text-[15px]">Accounts Collection</span>
                </div>
                
                <div className="border border-gray-200 rounded-[4px] bg-white overflow-hidden shadow-sm flex flex-col mb-4">
                  <div className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#17a2b8] text-white flex items-center justify-center font-bold text-[14px]">
                        1
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[15px] text-gray-800">Cash Account</span>
                        <span className="text-[13px] font-bold text-[#28a745]">Cash (Balance)</span>
                      </div>
                    </div>
                    <span className="font-bold text-[16px] text-[#007bff]">{formatAmount(-22020)}</span>
                  </div>
                  
                  <div className="bg-[#17a2b8] text-white p-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" strokeWidth={2} />
                        <span className="font-bold text-[15px]">Total Cash & Bank Balance</span>
                      </div>
                      <span className="text-[13px] opacity-90 mt-1">Cash {formatAmount(-22020)} + Bank {formatAmount(0)}</span>
                    </div>
                    <span className="font-bold text-[16px]">{formatAmount(-22020)}</span>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
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

// Minimal stub component to keep lucide-react dependencies working if any icon missing
const Calculator = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2"></rect>
    <line x1="8" x2="16" y1="6" y2="6"></line>
    <line x1="16" x2="16" y1="14" y2="18"></line>
    <path d="M16 10h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M8 14h.01"></path>
    <path d="M12 18h.01"></path>
    <path d="M8 18h.01"></path>
  </svg>
);
