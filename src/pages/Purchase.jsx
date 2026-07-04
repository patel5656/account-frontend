import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Info,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers,
  Users,
  Banknote,
  Download,
  Building,
  Upload
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
export function Purchase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatAmount, currentCurrency } = useSettings();
  const isPurchaseOrder = location.pathname.includes('company_purchase_order');
  const pageTitle = isPurchaseOrder ? 'Purchase Order Summary' : 'Purchase Invoice Summary';
  const [companyToggle, setCompanyToggle] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [loadingSheetModalOpen, setLoadingSheetModalOpen] = useState(false);
  
  const [partyName, setPartyName] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  const [collectionDate, setCollectionDate] = useState(getTodayDate());
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [collectionData, setCollectionData] = useState({
    todaySales: 0,
    cashSales: 0,
    creditSales: 0,
    moneyIn: { cashSale: 0, creditRecovery: 0, otherIncome: 0, total: 0 },
    moneyOut: { companyPaid: 0, employeePaid: 0, expensesPaid: 0, total: 0 },
    netCollection: 0,
    accounts: { cash: 0, bank: 0 }
  });

  useEffect(() => {
    if (collectionModalOpen) {
      fetchCollectionReport();
    }
  }, [collectionModalOpen, collectionDate]);

  const fetchCollectionReport = async () => {
    try {
      const { default: apiClient } = await import('../api/apiClient');
      const res = await apiClient.get('/financial/collections', {
        params: { startDate: collectionDate, endDate: collectionDate }
      });
      if (res.data.success) {
        setCollectionData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [isPurchaseOrder]);

  const fetchInvoices = async () => {
    try {
      const { default: apiClient } = await import('../api/apiClient');
      const res = await apiClient.get(`/inventory/${isPurchaseOrder ? 'PURCHASE_ORDER' : 'PURCHASE'}`);
      if (res.data.data) {
        setInvoices(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount = invoices.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalPaid = invoices.reduce((acc, curr) => acc + (curr.status === 'PAID' ? curr.totalAmount : 0), 0);
  const totalBalance = totalAmount - totalPaid;

  const handleSearch = () => {
    console.log("Searching with Party:", partyName, "Date:", dateFilter, "Custom Range:", customStartDate, customEndDate);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] flex flex-col p-3 relative">
      <div className="bg-white rounded shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-white text-[16px] font-medium tracking-wide">{pageTitle}</h2>
          
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
                  list="party-names"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  placeholder="Select Name"
                  className="w-full min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800"
                />
                <datalist id="party-names">
                  <option value="Party 1" />
                  <option value="Party 2" />
                </datalist>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="min-w-0 border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none bg-white text-gray-800 w-full sm:w-auto"
                >
                  <option value="Today">Today</option>
                  <option value="Yesterday">Yesterday</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last Month">Last Month</option>
                  <option value="This Month">This Month</option>
                  <option value="Custom Range">Custom Range</option>
                </select>

                {dateFilter === 'Custom Range' && (
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="date" 
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-gray-800"
                    />
                    <span className="text-[12px] text-gray-500 font-medium">to</span>
                    <input 
                      type="date" 
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none bg-white text-gray-800"
                    />
                  </div>
                )}

                <button 
                  onClick={handleSearch}
                  className="flex items-center gap-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors shadow-sm whitespace-nowrap"
                >
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
             <span className="font-bold text-[14px]">{formatAmount(totalAmount)}</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">TOTAL PAID:</span>
             <span className="font-bold text-[14px]">{formatAmount(totalPaid)}</span>
           </div>
           <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-[13px] tracking-wide">BALANCE:</span>
             <span className="font-bold text-[14px]">{formatAmount(totalBalance)}</span>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#343a40] text-white sticky top-0">
              <tr>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 whitespace-nowrap">Date</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 whitespace-nowrap">Invoice No</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 whitespace-nowrap w-full">Party Name</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-right whitespace-nowrap">Amount</th>
                <th className="px-3 py-2 text-[13px] font-bold border-r border-gray-600 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-gray-700 whitespace-nowrap">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-[#007bff] font-medium whitespace-nowrap">{invoice.invoiceNo}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-[#007bff] font-bold w-full">{invoice.customer?.name || 'Unknown'}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-right text-[13px] text-gray-800 font-bold whitespace-nowrap">{formatAmount(invoice.totalAmount)}</td>
                  <td className="px-3 py-2 border-r border-gray-200 text-center whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{invoice.status}</span>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center text-[14px] text-gray-500">No data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Collection Report Modal */}
      {collectionModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <BarChart2 className="w-5 h-5 text-white" strokeWidth={3} />
                <h3 className="text-white font-bold text-[16px]">Collection Report</h3>
              </div>
              <button onClick={() => setCollectionModalOpen(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-5 h-5 font-bold text-white" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 flex flex-col gap-4">
              
              {/* Select Period and Date */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="w-full sm:w-auto">
                  <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-700 outline-none w-[100px] shadow-sm">
                    <option>All</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <label className="text-[13px] font-bold text-gray-800">Select Period</label>
                    <select className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1 text-[13px] text-gray-700 outline-none w-[120px] shadow-sm">
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
                      type="date"
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-wrap items-center gap-1.5 bg-[#17a2b8] text-white px-3 py-1.5 rounded-[4px] text-[13px] font-bold shadow-sm">
                      <Calendar className="w-4 h-4" />
                      {collectionDate ? new Date(collectionDate).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-') : 'Select Date'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Today's Sales */}
                <div className="bg-[#17a2b8] rounded-[4px] p-2 text-white flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BarChart2 className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[13px]">Today's Sales</span>
                  </div>
                  <span className="text-[18px] font-bold leading-none">{formatAmount(collectionData.todaySales)}</span>
                </div>
                {/* Cash Sales */}
                <div className="bg-[#28a745] rounded-[4px] p-2 text-white flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Coins className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[13px]">Cash Sales</span>
                  </div>
                  <span className="text-[18px] font-bold leading-none">{formatAmount(collectionData.cashSales)}</span>
                </div>
                {/* Credit Sales */}
                <div className="bg-[#dc3545] rounded-[4px] p-2 text-white flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BadgeDollarSign className="w-4 h-4" strokeWidth={3} />
                    <span className="font-bold text-[13px]">Credit Sales</span>
                  </div>
                  <span className="text-[18px] font-bold leading-none">{formatAmount(collectionData.creditSales)}</span>
                </div>
              </div>

              {/* Money In / Out Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {/* MONEY IN */}
                <div className="border border-gray-200 rounded-[4px] flex flex-col overflow-hidden shadow-sm">
                  <div className="bg-[#d4edda] text-[#28a745] font-bold text-[12px] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                    <ArrowDownToLine className="w-4 h-4" strokeWidth={3} />
                    MONEY IN
                  </div>
                  <div className="bg-white p-2 space-y-1">
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#28a745]" />
                        Total Cash Sale
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyIn.cashSale)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#28a745]" />
                        Total Credit Recovery
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyIn.creditRecovery)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#28a745]" />
                        Total Other Income
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyIn.otherIncome)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#28a745]" />
                        Total Payment In
                      </div>
                      <span className="font-bold text-black">{formatAmount(0)}</span>
                    </div>
                  </div>
                  <div className="bg-[#28a745] text-white font-bold text-[13px] px-3 py-2 flex justify-between items-center mt-auto">
                    <span>TOTAL MONEY IN</span>
                    <span>{formatAmount(collectionData.moneyIn.total)}</span>
                  </div>
                </div>

                {/* MONEY OUT */}
                <div className="border border-gray-200 rounded-[4px] flex flex-col overflow-hidden shadow-sm">
                  <div className="bg-[#f8d7da] text-[#dc3545] font-bold text-[12px] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                    <ArrowUpFromLine className="w-4 h-4" strokeWidth={3} />
                    MONEY OUT
                  </div>
                  <div className="bg-white p-2 space-y-1">
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#dc3545]" />
                        Total Company Paid
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyOut.companyPaid)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#dc3545]" />
                        Total Employee Paid
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyOut.employeePaid)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#dc3545]" />
                        Total Expenses Paid
                      </div>
                      <span className="font-bold text-black">{formatAmount(collectionData.moneyOut.expensesPaid)}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-[12px] text-gray-600 font-medium px-1 py-1">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#dc3545]" />
                        Total Payment Out
                      </div>
                      <span className="font-bold text-black">{formatAmount(0)}</span>
                    </div>
                  </div>
                  <div className="bg-[#dc3545] text-white font-bold text-[13px] px-3 py-2 flex justify-between items-center mt-auto">
                    <span>TOTAL MONEY OUT</span>
                    <span>{formatAmount(collectionData.moneyOut.total)}</span>
                  </div>
                </div>
              </div>

              {/* Net Collection */}
              <div className="bg-[#28a745] rounded-[4px] px-4 py-2 text-white flex items-center justify-between shadow-sm mt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <Calculator className="w-5 h-5" strokeWidth={2.5} />
                    <span className="font-bold text-[14px] uppercase">NET COLLECTION</span>
                  </div>
                  <span className="text-[10.5px] font-medium opacity-90 mt-0.5">(Total Money In {formatAmount(collectionData.moneyIn.total)} - Total Money Out {formatAmount(collectionData.moneyOut.total)})</span>
                </div>
                <div className="font-bold text-[20px]">
                  {formatAmount(collectionData.netCollection)}
                </div>
              </div>

              {/* Accounts Collection */}
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-1.5 text-gray-500 mb-0.5">
                  <FileText className="w-4 h-4" strokeWidth={3} />
                  <span className="font-bold text-[13px]">Accounts Collection</span>
                </div>
                
                <div className="border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
                  <div className="p-3 bg-white flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#17a2b8] text-white flex items-center justify-center font-bold text-[13px]">
                        1
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black text-[13px]">Cash Account</span>
                        <span className="text-[#28a745] font-bold text-[10px]">Cash (Balance)</span>
                      </div>
                    </div>
                    <span className="text-[#007bff] font-bold text-[14px]">{formatAmount(collectionData.accounts.cash)}</span>
                  </div>
                  
                  <div className="bg-[#17a2b8] p-3 flex items-center justify-between text-white">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-4 h-4" strokeWidth={2.5} />
                        <span className="font-bold text-[13px]">Total Cash & Bank Balance</span>
                      </div>
                      <span className="text-[10.5px] font-medium mt-0.5 opacity-90">Cash {formatAmount(collectionData.accounts.cash)} + Bank {formatAmount(collectionData.accounts.bank)}</span>
                    </div>
                    <span className="font-bold text-[16px]">{formatAmount(collectionData.accounts.cash + collectionData.accounts.bank)}</span>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-4 py-2 flex justify-end bg-gray-50 rounded-b-[4px]">
              <button 
                onClick={() => setCollectionModalOpen(false)} 
                className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-3 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm"
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
                  <button 
                    onClick={() => setSelectedInvoices(invoices.map(inv => inv.id))}
                    className="border border-[#007bff] text-[#007bff] hover:bg-blue-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <button 
                    onClick={() => setSelectedInvoices([])}
                    className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-[3px] text-[13px] font-medium transition-colors"
                  >
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
                    {invoices.map((invoice, index) => (
                      <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => {
                        if (selectedInvoices.includes(invoice.id)) {
                          setSelectedInvoices(selectedInvoices.filter(i => i !== invoice.id));
                        } else {
                          setSelectedInvoices([...selectedInvoices, invoice.id]);
                        }
                      }}>
                        <td className="px-3 py-2 border-r border-gray-200">
                          <input 
                            type="checkbox" 
                            checked={selectedInvoices.includes(invoice.id)} 
                            readOnly
                            className="cursor-pointer"
                          />
                        </td>
                        <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-[#007bff] font-medium whitespace-nowrap">{invoice.invoiceNo}</td>
                        <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-gray-800 font-bold whitespace-nowrap">{invoice.customer?.name || 'Unknown'}</td>
                        <td className="px-3 py-2 border-r border-gray-200 text-[13px] text-gray-700 whitespace-nowrap">{new Date(invoice.date).toLocaleDateString()}</td>
                        <td className="px-3 py-2 text-[13px] text-gray-800 font-bold whitespace-nowrap">{formatAmount(invoice.totalAmount)}</td>
                      </tr>
                    ))}
                    {invoices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-3 py-8 text-center text-[14px] text-gray-500">No invoices available for loading sheet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
          </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-between items-center">
              <div className="text-[14px] text-gray-600">
                Selected: {selectedInvoices.length} of {invoices.length}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setLoadingSheetModalOpen(false)} 
                  className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (selectedInvoices.length === 0) return alert('Select invoices first');
                    alert('This will connect to a WhatsApp API in the future. For now, please click Generate Loading Sheet, download the PDF, and attach it to your WhatsApp messages manually.');
                  }}
                  className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
                  Send WhatsApp PDFs
                </button>
                <button 
                  onClick={async () => {
                    if (selectedInvoices.length === 0) return alert('Select invoices first');
                    try {
                      const { default: apiClient } = await import('../api/apiClient');
                      const response = await apiClient.post('/loading-sheet/generate-pdf', { invoiceIds: selectedInvoices }, { responseType: 'blob' });
                      const url = window.URL.createObjectURL(new Blob([response.data]));
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', `LoadingSheet_${Date.now()}.pdf`);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode.removeChild(link);
                    } catch (error) {
                      console.error('PDF Error:', error);
                      alert('Failed to generate PDF');
                    }
                  }}
                  className="bg-[#28a745] hover:bg-[#218838] opacity-80 text-white px-4 py-1.5 rounded-[3px] text-[14px] font-medium transition-colors shadow-sm"
                >
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
