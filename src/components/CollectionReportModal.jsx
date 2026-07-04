import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart2, X, Calendar, Banknote, Download, Upload, Layers, ArrowDownToLine, ArrowUpFromLine, Building, Users, FileText, Calculator
} from 'lucide-react';
import apiClient from '../api/apiClient';
import { useSettings } from '../context/SettingsContext';

export function CollectionReportModal({ isOpen, onClose }) {
  const { formatAmount, currentCurrency } = useSettings();
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [period, setPeriod] = useState('Today');
  const dateInputRef = useRef(null);

  const [data, setData] = useState({
    todaySales: 0,
    cashSales: 0,
    creditSales: 0,
    moneyIn: { cashSale: 0, creditRecovery: 0, otherIncome: 0, total: 0 },
    moneyOut: { companyPaid: 0, employeePaid: 0, expensesPaid: 0, total: 0 },
    netCollection: 0,
    accounts: { cash: 0, bank: 0 }
  });

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  useEffect(() => {
    if (isOpen) {
      fetchReport();
    }
  }, [isOpen, reportDate, period]);

  const fetchReport = async () => {
    try {
      let startDate = reportDate;
      let endDate = reportDate;
      
      const selected = new Date(reportDate);
      
      switch (period) {
        case 'Today':
          // startDate and endDate remain reportDate
          break;
        case 'Yesterday':
          const yesterday = new Date(selected);
          yesterday.setDate(yesterday.getDate() - 1);
          startDate = yesterday.toISOString().split('T')[0];
          endDate = startDate;
          break;
        case 'Last 7 Days':
          const last7 = new Date(selected);
          last7.setDate(last7.getDate() - 6);
          startDate = last7.toISOString().split('T')[0];
          break;
        case 'Last 30 Days':
          const last30 = new Date(selected);
          last30.setDate(last30.getDate() - 29);
          startDate = last30.toISOString().split('T')[0];
          break;
        case 'This Month':
          const firstDay = new Date(selected.getFullYear(), selected.getMonth(), 1);
          const lastDay = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);
          startDate = firstDay.toISOString().split('T')[0];
          // End date should be today or reportDate if it's in the month, but let's just use the end of the month
          endDate = lastDay.toISOString().split('T')[0];
          break;
        case 'Custom Range':
          // Custom range would need two date pickers, but we'll default to reportDate for now
          break;
      }

      const res = await apiClient.get('/financial/collections', {
        params: {
          startDate,
          endDate
        }
      });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch collection report", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-300">
        
        {/* Modal Header */}
        <div className="bg-[#4F46E5] px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <BarChart2 className="w-5 h-5 text-white" strokeWidth={3} />
            <h3 className="text-white font-medium text-[16px]">Collection Report</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
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
                <select value={period} onChange={e => setPeriod(e.target.value)} className="min-w-0 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[14px] text-gray-700 outline-none w-[150px] shadow-sm bg-white">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="relative flex items-center bg-[#4F46E5] hover:bg-[#4338ca] transition-colors rounded-[4px] shadow-sm overflow-hidden">
                <div className="px-2 text-white pointer-events-none flex items-center justify-center border-r border-indigo-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input 
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="bg-transparent text-white px-2 py-1.5 text-[13px] font-bold outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
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
              <span className="text-[18px] font-bold">{formatAmount(data.todaySales)}</span>
            </div>
            
            <div className="bg-[#28a745] rounded-[4px] p-3 text-white flex flex-col shadow-sm">
              <div className="flex flex-wrap items-center gap-1.5 mb-1 opacity-90">
                <Banknote className="w-4 h-4" strokeWidth={3} />
                <span className="font-bold text-[14px]">Cash Sales</span>
              </div>
              <span className="text-[18px] font-bold">{formatAmount(data.cashSales)}</span>
            </div>
            
            <div className="bg-[#dc3545] rounded-[4px] p-3 text-white flex flex-col shadow-sm">
              <div className="flex flex-wrap items-center gap-1.5 mb-1 opacity-90">
                <Layers className="w-4 h-4" strokeWidth={3} />
                <span className="font-bold text-[14px]">Credit Sales</span>
              </div>
              <span className="text-[18px] font-bold">{formatAmount(data.creditSales)}</span>
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
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyIn.cashSale)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                   <div className="flex items-center gap-2">
                     <Banknote className="w-4 h-4 text-[#28a745]" />
                     <span>Total Credit Recovery</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyIn.creditRecovery)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                   <div className="flex items-center gap-2">
                     <Banknote className="w-4 h-4 text-[#28a745]" />
                     <span>Total Other Income</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyIn.otherIncome)}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                   <div className="flex items-center gap-2">
                     <Download className="w-4 h-4 text-[#28a745]" />
                     <span>Total Payment In</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyIn.total)}</span>
                </div>
              </div>
              
              <div className="bg-[#28a745] text-white px-3 py-2.5 flex items-center justify-between mt-auto">
                <span className="font-bold text-[14px] uppercase tracking-wide">Total Money In</span>
                <span className="font-bold text-[15px]">{formatAmount(data.moneyIn.total)}</span>
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
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyOut.companyPaid)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                   <div className="flex items-center gap-2">
                     <Users className="w-4 h-4 text-[#dc3545]" />
                     <span>Total Employee Paid</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyOut.employeePaid)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                   <div className="flex items-center gap-2">
                     <FileText className="w-4 h-4 text-[#dc3545]" />
                     <span>Total Expenses Paid</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyOut.expensesPaid)}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                   <div className="flex items-center gap-2">
                     <Upload className="w-4 h-4 text-[#dc3545]" />
                     <span>Total Payment Out</span>
                   </div>
                   <span className="font-bold text-gray-800">{formatAmount(data.moneyOut.total)}</span>
                </div>
              </div>
              
              <div className="bg-[#dc3545] text-white px-3 py-2.5 flex items-center justify-between mt-auto">
                <span className="font-bold text-[14px] uppercase tracking-wide">Total Money Out</span>
                <span className="font-bold text-[15px]">{formatAmount(data.moneyOut.total)}</span>
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
              <span className="text-[12px] opacity-90 mt-0.5">(Total Money In {formatAmount(data.moneyIn.total)} - Total Money Out {formatAmount(data.moneyOut.total)})</span>
            </div>
            <div className="font-bold text-[22px]">
              {formatAmount(data.netCollection)}
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
                <span className="font-bold text-[16px] text-[#007bff]">{formatAmount(data.accounts.cash)}</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#17a2b8] text-white flex items-center justify-center font-bold text-[14px]">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] text-gray-800">Bank Account</span>
                    <span className="text-[13px] font-bold text-[#007bff]">Bank (Balance)</span>
                  </div>
                </div>
                <span className="font-bold text-[16px] text-[#007bff]">{formatAmount(data.accounts.bank)}</span>
              </div>
              
              <div className="bg-[#17a2b8] text-white p-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" strokeWidth={2} />
                    <span className="font-bold text-[15px]">Total Cash & Bank Balance</span>
                  </div>
                  <span className="text-[13px] opacity-90 mt-1">Cash {formatAmount(data.accounts.cash)} + Bank {formatAmount(data.accounts.bank)}</span>
                </div>
                <span className="font-bold text-[16px]">{formatAmount(data.accounts.cash + data.accounts.bank)}</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Modal Footer */}
        <div className="bg-[#f8f9fa] border-t border-gray-200 px-4 py-3 flex justify-end shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white px-4 py-1.5 rounded-[4px] text-[14px] transition-colors shadow-sm"
          >
            <X className="w-4 h-4 font-bold" strokeWidth={3} />
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
}
