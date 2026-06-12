import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, FileText, Share2, MessageCircle, Upload, Download, ExternalLink } from 'lucide-react';

export function GstrSaleSummary() {
  const navigate = useNavigate();

  const handleExportCSV = () => {
    const csvContent = [
      ['Date/Invoice No.', 'Party Name', 'GSTIN', 'State', 'Taxable Amount', 'GST %', 'Quantity', 'IGST', 'CGST', 'SGST', 'Sub Total', 'Grand Total'],
      ['', '', '', 'Total', '0', '', '', '0', '0', '0', '0', '0']
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr_sale_summary.csv";
    link.click();
  };

  const handleDownload = () => {
    const data = { message: "GSTR Sale Summary Data" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr_sale_summary.json";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GST Sales Summary',
        text: 'Check out the GST Sales Summary',
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
          <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
            <option>Select</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:max-w-[300px]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#007bff]"></div>
            </div>
            <label className="text-[13px] font-bold text-gray-800">Party Name</label>
          </div>
          <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-400 bg-gray-50" disabled>
            <option>Select Name</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5">
          <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#007bff]"></div>
          </div>
          <label className="text-[13px] font-bold text-gray-800">Show HSN-wise</label>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700 mb-1">GST Sales Summary</h2>
          <p className="text-[14px] font-bold text-gray-800">From 30-Apr-2026 To 30-May-2026</p>
        </div>

        {/* Table */}
        <div className="p-4 w-full">
          <div className="table-scroll w-full overflow-x-auto">
            <table className="w-full border-collapse border border-black text-center">
            <thead>
              <tr>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Date<br/>Invoice No.</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[20%] whitespace-nowrap">Party Name</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[10%] whitespace-nowrap">GSTIN</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">State</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Taxable<br/>Amount</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[5%] whitespace-nowrap">GST %</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">Quantity</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">IGST</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">CGST</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[6%] whitespace-nowrap">SGST</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[8%] whitespace-nowrap">Sub Total</th>
                <th className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800 w-[9%] whitespace-nowrap">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Total Row */}
              <tr>
                <td className="py-3 px-2 border border-black text-[13px]"></td>
                <td className="py-3 px-2 border border-black text-[13px]"></td>
                <td className="py-3 px-2 border border-black text-[13px]"></td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">Total</td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
                <td className="py-3 px-2 border border-black text-[13px]"></td>
                <td className="py-3 px-2 border border-black text-[13px]"></td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
                <td className="py-3 px-2 border border-black text-[13px] font-bold text-gray-800">0</td>
              </tr>
            </tbody>
          </table>
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
        <button 
          onClick={handleDownload}
          className="bg-[#343a40] hover:bg-[#23272b] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Download
        </button>
      </div>

    </div>
  );
}
