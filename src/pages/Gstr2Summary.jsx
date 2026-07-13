import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink, Share2, MessageCircle } from 'lucide-react';
import apiClient from '../api/apiClient';

export function Gstr2Summary() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('This Month');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRangeStr, setDateRangeStr] = useState('');

  const fetchSummary = async (selectedPeriod) => {
    setLoading(true);
    try {
      const now = new Date();
      let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      let endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      if (selectedPeriod === 'Last Month') {
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      } else if (selectedPeriod === 'This Quarter') {
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
        startDate = new Date(now.getFullYear(), quarterMonth, 1);
        endDate = new Date(now.getFullYear(), quarterMonth + 3, 0);
      } else if (selectedPeriod === 'Last Quarter') {
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3 - 3;
        startDate = new Date(now.getFullYear(), quarterMonth, 1);
        endDate = new Date(now.getFullYear(), quarterMonth + 3, 0);
      }

      const startStr = startDate.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];
      
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      setDateRangeStr(`From ${startDate.toLocaleDateString('en-GB', options).replace(/ /g, '-')} To ${endDate.toLocaleDateString('en-GB', options).replace(/ /g, '-')}`);

      const res = await apiClient.get(`/gstr/gstr-2?startDate=${startStr}&endDate=${endStr}`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching GSTR-2 summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(period && period !== 'Custom Range' && period !== 'Select') {
        fetchSummary(period);
    }
  }, [period]);

  const handleExportJSON = () => {
    const exportData = data || { message: "GSTR2 Summary Data" };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr2_summary.json";
    link.click();
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Particular', 'No. of Vouchers', 'Taxable Values', 'IGST', 'CGST', 'SGST', 'Cess', 'Tax Amount', 'Invoice Amount'],
      ['Total', data?.total?.count||0, data?.total?.taxable||0, data?.total?.igst||0, data?.total?.cgst||0, data?.total?.sgst||0, data?.total?.cess||0, data?.total?.taxAmt||0, data?.total?.invoiceAmt||0]
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr2_summary.csv";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GSTR2 Summary',
        text: 'Check out the GSTR2 Summary',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  const renderRow = (title, key, rowClass = "text-gray-600", valClass = "font-bold text-gray-700", indent = true) => {
    const rowData = data && data[key] ? data[key] : { count: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, taxAmt: 0, invoiceAmt: 0 };
    return (
      <tr className="hover:bg-blue-50 transition-colors cursor-pointer">
        <td className={`py-2 ${indent ? 'px-6' : 'px-3'} border border-black text-[13px] ${rowClass}`}>{title}</td>
        <td className={`py-2 px-2 border border-black text-center text-[13px] ${valClass}`}>{rowData.count || 0}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.taxable ? rowData.taxable.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.igst ? rowData.igst.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.cgst ? rowData.cgst.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.sgst ? rowData.sgst.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.cess ? rowData.cess.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.taxAmt ? rowData.taxAmt.toFixed(2) : ''}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]">{rowData.invoiceAmt ? rowData.invoiceAmt.toFixed(2) : ''}</td>
      </tr>
    );
  };

  const renderEmptyHeaderRow = (title) => (
    <tr className="hover:bg-blue-50 transition-colors cursor-pointer">
        <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">{title}</td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
        <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
    </tr>
  );

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-4 flex flex-col relative pb-[80px]">
      
      {/* Top Control */}
      <div className="mb-4 flex flex-col gap-1.5 w-full sm:max-w-[250px]">
        <label className="text-[13px] font-bold text-gray-800">Select Period</label>
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white"
        >
          <option value="">Select</option>
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="This Quarter">This Quarter</option>
          <option value="Last Quarter">Last Quarter</option>
          <option value="Custom Range">Custom Range</option>
        </select>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Header */}
        <div className="text-center py-4">
          <h2 className="text-[14px] text-gray-700 mb-1">GSTR2 Summary</h2>
          <p className="text-[14px] font-bold text-gray-800">{dateRangeStr}</p>
        </div>

        {/* Table */}
        <div className="px-4 pb-4 w-full">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-black text-left">
            <thead>
              <tr>
                <th className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-center w-[35%] whitespace-nowrap">Particular</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center leading-tight w-[7%] whitespace-nowrap">No. of<br/>Vouchers.</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[10%] whitespace-nowrap">Taxable Values</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[6%] whitespace-nowrap">IGST</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[6%] whitespace-nowrap">CGST</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[6%] whitespace-nowrap">SGST</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[6%] whitespace-nowrap">Cess</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[10%] whitespace-nowrap">Tax Amount</th>
                <th className="py-2.5 px-2 border border-black text-[13px] font-bold text-gray-800 text-center w-[14%] whitespace-nowrap">Invoice<br/>Amount</th>
              </tr>
            </thead>
            <tbody>
              {renderEmptyHeaderRow("B2B Invoices - 4A, 4B, 4C, 6B, 6C")}
              {renderRow("Taxable Sales", "b2b")}
              {renderRow("Reverse charge supplies", "reverseCharge")}
              
              {renderRow("B2C(Large) Invoices - 5A, 5B", "b2cLarge", "font-bold text-gray-800", "font-bold text-gray-700", false)}
              {renderRow("B2C(Small) Invoices - 7", "b2cSmall", "font-bold text-gray-800", "font-bold text-gray-700", false)}
              {renderRow("Credit/Debit Notes(Registered) - 9B", "cdnr", "font-bold text-gray-800", "font-bold text-gray-700", false)}
              {renderRow("Credit/Debit Notes(Unregistered) - 9B", "cdnur", "font-bold text-gray-800", "font-bold text-gray-700", false)}
              {renderRow("Exports Invoices -6A", "exports", "font-bold text-gray-800", "font-bold text-gray-700", false)}
              
              {renderEmptyHeaderRow("Tax Liability(Advances received) - 11A(1),11A(2)")}
              {renderEmptyHeaderRow("Adjustment of Advances - I I B(I), II B(2)")}
              {renderEmptyHeaderRow("Nil Rated Invoices - 8A, 8B, 8C, 8D")}
              
              {renderRow("Nil Rated Supplies", "nilRated")}
              {renderRow("Exempted Supplies", "exempted")}
              {renderRow("Non-GST Supplies", "nonGst")}
              
              {renderRow("Total", "total", "font-bold text-[#4F46E5]", "font-bold text-gray-800", false)}
              
              {renderRow("HSN/SAC summary (b2b)", "hsnB2b", "font-bold text-gray-800", "font-bold text-gray-800", false)}
              {renderRow("HSN/SAC summary (b2c)", "hsnB2c", "font-bold text-gray-800", "font-bold text-gray-800", false)}
              {renderEmptyHeaderRow("Document Summary")}

            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 md:left-[220px] right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 footer-btns z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1 shadow-sm transition-colors"
        >
          <span className="text-[16px] leading-none mt-[-2px]">&laquo;</span> Go back
        </button>
        <button 
          onClick={handleShare}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
          className="bg-[#28a745] hover:bg-[#218838] text-white text-[13px] font-medium px-3 py-1.5 rounded-[3px] flex items-center justify-center shadow-sm transition-colors">
          <MessageCircle className="w-4 h-4 fill-white" />
        </button>
        <button 
          onClick={handleExportJSON}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors">
          <Download className="w-4 h-4" /> Export to JSON
        </button>
        <button 
          onClick={handleExportCSV}
          className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

    </div>
  );
}
