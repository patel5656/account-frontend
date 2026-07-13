import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MessageCircle, Upload } from 'lucide-react';
import apiClient from '../api/apiClient';

export function HsnWiseSummary() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('All');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/invoices');
      if (res.data?.success) {
        setData(res.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching HSN-wise data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDateInPeriod = (dateStr, selectedPeriod) => {
    if (selectedPeriod === 'All') return true;
    const date = new Date(dateStr);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'This Month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case 'Last Month': {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
      }
      case 'This Quarter': {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const dateQuarter = Math.floor(date.getMonth() / 3);
        return currentQuarter === dateQuarter && date.getFullYear() === now.getFullYear();
      }
      case 'This Year': {
        const currentYear = now.getFullYear();
        let fiscalYearStart, fiscalYearEnd;
        if (now.getMonth() >= 3) { // Apr - Dec
          fiscalYearStart = new Date(currentYear, 3, 1);
          fiscalYearEnd = new Date(currentYear + 1, 2, 31, 23, 59, 59);
        } else { // Jan - Mar
          fiscalYearStart = new Date(currentYear - 1, 3, 1);
          fiscalYearEnd = new Date(currentYear, 2, 31, 23, 59, 59);
        }
        return date >= fiscalYearStart && date <= fiscalYearEnd;
      }
      default:
        return true;
    }
  };

  const getPeriodDateRangeString = () => {
    const now = new Date();
    let startDate, endDate;
    
    switch (period) {
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'Last Month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'This Quarter': {
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
        startDate = new Date(now.getFullYear(), quarterMonth, 1);
        endDate = new Date(now.getFullYear(), quarterMonth + 3, 0);
        break;
      }
      case 'This Year': {
        const currentYear = now.getFullYear();
        if (now.getMonth() >= 3) {
          startDate = new Date(currentYear, 3, 1);
          endDate = new Date(currentYear + 1, 2, 31);
        } else {
          startDate = new Date(currentYear - 1, 3, 1);
          endDate = new Date(currentYear, 2, 31);
        }
        break;
      }
      case 'All':
      default:
        return 'All Time';
    }
    
    const formatDateStr = (d) => {
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    };
    
    return `From ${formatDateStr(startDate)} To ${formatDateStr(endDate)}`;
  };

  // Filter invoices by selected period
  const filteredInvoices = data.filter(invoice => isDateInPeriod(invoice.date, period));

  // Group items by HSN Code and GST rate
  const hsnGroups = {};

  filteredInvoices.forEach(invoice => {
    const isSales = invoice.type === 'SALES';
    const isSalesReturn = invoice.type === 'SALES_RETURN';
    const isPurchase = invoice.type === 'PURCHASE';
    const isPurchaseReturn = invoice.type === 'PURCHASE_RETURN';

    if (!isSales && !isSalesReturn && !isPurchase && !isPurchaseReturn) {
      return; // Skip other transaction types
    }

    const multiplier = (isSalesReturn || isPurchaseReturn) ? -1 : 1;
    const groupKey = isSales || isSalesReturn ? 'sales' : 'purchase';

    invoice.items?.forEach(item => {
      const hsn = item.product?.hsnCode || 'N/A';
      const rate = Number(item.gstRate) || Number(item.product?.tax) || 0;
      const key = `${hsn}-${rate}`;

      if (!hsnGroups[key]) {
        hsnGroups[key] = {
          hsn,
          rate,
          sales: { taxable: 0, tax: 0, total: 0 },
          purchase: { taxable: 0, tax: 0, total: 0 }
        };
      }

      const taxable = (Number(item.amount) || 0) * multiplier;
      const cgst = Number(item.cgst) || 0;
      const sgst = Number(item.sgst) || 0;
      const igst = Number(item.igst) || 0;
      const tax = (Number(item.gstAmount) || (cgst + sgst + igst) || (taxable * rate / 100)) * multiplier;
      const total = taxable + tax;

      hsnGroups[key][groupKey].taxable += taxable;
      hsnGroups[key][groupKey].tax += tax;
      hsnGroups[key][groupKey].total += total;
    });
  });

  // Sort by HSN code and then by rate
  const displayRows = Object.values(hsnGroups).sort((a, b) => {
    if (a.hsn !== b.hsn) {
      return a.hsn.localeCompare(b.hsn);
    }
    return a.rate - b.rate;
  });

  // Calculate totals
  const totals = displayRows.reduce((acc, row) => {
    acc.salesTaxable += row.sales.taxable;
    acc.salesTax += row.sales.tax;
    acc.salesTotal += row.sales.total;
    acc.purchaseTaxable += row.purchase.taxable;
    acc.purchaseTax += row.purchase.tax;
    acc.purchaseTotal += row.purchase.total;
    return acc;
  }, { salesTaxable: 0, salesTax: 0, salesTotal: 0, purchaseTaxable: 0, purchaseTax: 0, purchaseTotal: 0 });

  const formatNumber = (num) => Number(num).toFixed(2);

  const handleExportCSV = () => {
    const headers = ['HSN SLAB', 'GST %', 'Sales Taxable Amount', 'Sales Tax', 'Sales Total', 'Purchase Taxable Amount', 'Purchase Tax', 'Purchase Total'];
    let rowsContent = [];

    displayRows.forEach(row => {
      rowsContent.push([
        row.hsn,
        `${row.rate}%`,
        row.sales.taxable.toFixed(2),
        row.sales.tax.toFixed(2),
        row.sales.total.toFixed(2),
        row.purchase.taxable.toFixed(2),
        row.purchase.tax.toFixed(2),
        row.purchase.total.toFixed(2)
      ].join(','));
    });

    // Totals row
    rowsContent.push([
      'Totals :',
      '',
      totals.salesTaxable.toFixed(2),
      totals.salesTax.toFixed(2),
      totals.salesTotal.toFixed(2),
      totals.purchaseTaxable.toFixed(2),
      totals.purchaseTax.toFixed(2),
      totals.purchaseTotal.toFixed(2)
    ].join(','));

    const csvContent = [headers.join(','), ...rowsContent].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `hsn_wise_summary.csv`;
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'HSN-wise Summary',
        text: 'Check out the HSN-wise Summary',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-4 flex flex-col relative pb-[80px]">
      
      {/* Top Controls */}
      <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-4 flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-1.5 w-full sm:max-w-[250px]">
          <label className="text-[13px] font-bold text-gray-800">Select Period</label>
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white cursor-pointer"
          >
            <option value="All">All Time</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700 mb-1">HSN-wise Summary</h2>
          <p className="text-[14px] font-bold text-gray-800">{getPeriodDateRangeString()}</p>
        </div>

        {/* Table */}
        <div className="p-4 w-full">
          <div className="table-scroll w-full overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 text-[13px] text-gray-500 font-medium">Loading data...</div>
            ) : (
              <table className="w-full border-collapse border border-black text-center">
                <thead>
                  <tr>
                    <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 w-[18%] whitespace-nowrap" rowSpan="2">HSN SLAB</th>
                    <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap" rowSpan="2">GST %</th>
                    <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 whitespace-nowrap" colSpan="3">Sales</th>
                    <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 whitespace-nowrap" colSpan="3">Purchase</th>
                  </tr>
                  <tr>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[14%] whitespace-nowrap">Taxable Amount</th>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[10%] whitespace-nowrap">Tax</th>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[10%] whitespace-nowrap">Total</th>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[14%] whitespace-nowrap">Taxable Amount</th>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[10%] whitespace-nowrap">Tax</th>
                    <th className="py-2 px-3 border border-black text-[13px] font-bold text-[#dc3545] w-[10%] whitespace-nowrap">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-4 text-center text-[13px] text-gray-500">
                        No transactions found for the selected period.
                      </td>
                    </tr>
                  ) : (
                    displayRows.map(row => (
                      <tr key={row.key} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-left">{row.hsn}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800">{row.rate}%</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.sales.taxable)}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.sales.tax)}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.sales.total)}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.purchase.taxable)}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.purchase.tax)}</td>
                        <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">{formatNumber(row.purchase.total)}</td>
                      </tr>
                    ))
                  )}
                  {/* Totals Row */}
                  <tr className="bg-[#4F46E5] bg-opacity-15">
                    <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-left">Totals :</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 font-bold"></td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.salesTaxable)}</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.salesTax)}</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.salesTotal)}</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.purchaseTaxable)}</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.purchaseTax)}</td>
                    <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right font-bold">{formatNumber(totals.purchaseTotal)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 footer-btns z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#dc3545] hover:bg-[#c82333] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
        <button 
          onClick={handleShare}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
        </button>
        <button 
          onClick={handleExportCSV}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" /> Export
        </button>
      </div>

    </div>
  );
}
