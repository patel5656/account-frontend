import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink, Share2, MessageCircle } from 'lucide-react';

export function Gstr1Summary() {
  const navigate = useNavigate();

  const handleExportJSON = () => {
    const data = { message: "GSTR1 Summary Data" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr1_summary.json";
    link.click();
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Particular', 'No. of Vouchers', 'Taxable Values', 'IGST', 'CGST', 'SGST', 'Cess', 'Tax Amount', 'Invoice Amount'],
      ['Total', '0', '0', '0', '0', '0', '0', '0', '0']
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gstr1_summary.csv";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GSTR1 Summary',
        text: 'Check out the GSTR1 Summary',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-45px)] p-4 flex flex-col relative pb-[80px]">
      
      {/* Top Control */}
      <div className="mb-4 flex flex-col gap-1.5 w-full sm:max-w-[250px]">
        <label className="text-[13px] font-bold text-gray-800">Select Period</label>
        <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white">
          <option>Select</option>
        </select>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden">
        
        {/* Header */}
        <div className="text-center py-4">
          <h2 className="text-[14px] text-gray-700 mb-1">GSTR1 Summary</h2>
          <p className="text-[14px] font-bold text-gray-800">From 30-Apr-2026 To 30-May-2026</p>
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
              {/* B2B Invoices */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">B2B Invoices - 4A, 4B, 4C, 6B, 6C</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              <tr>
                <td className="py-2 px-6 border border-black text-[13px] text-gray-600">Taxable Sales</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              <tr>
                <td className="py-2 px-6 border border-black text-[13px] text-gray-600">Reverse charge supplies</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              
              {/* B2C Large */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">B2C(Large) Invoices - 5A, 5B</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              
              {/* B2C Small */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">B2C(Small) Invoices - 7</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Credit/Debit Registered */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Credit/Debit Notes(Registered) - 9B</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Credit/Debit Unregistered */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Credit/Debit Notes(Unregistered) - 9B</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Exports Invoices */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Exports Invoices -6A</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Tax Liability */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Tax Liability(Advances received) - 11A(1),11A(2)</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Adjustment of Advances */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Adjustment of Advances - I I B(I), II B(2)</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Nil Rated Invoices */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Nil Rated Invoices - 8A, 8B, 8C, 8D</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              <tr>
                <td className="py-2 px-6 border border-black text-[13px] text-gray-600">Nil Rated Supplies</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              <tr>
                <td className="py-2 px-6 border border-black text-[13px] text-gray-600">Exempted Supplies</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              <tr>
                <td className="py-2 px-6 border border-black text-[13px] text-gray-600">Non-GST Supplies</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-700">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>
              
              {/* Total Row */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-[#4F46E5]">Total</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-800">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* HSN/SAC summary (b2b) */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">HSN/SAC summary (b2b)</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-800">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* HSN/SAC summary (b2c) */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">HSN/SAC summary (b2c)</td>
                <td className="py-2 px-2 border border-black text-center text-[13px] font-bold text-gray-800">0</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

              {/* Document Summary */}
              <tr>
                <td className="py-2 px-3 border border-black text-[13px] font-bold text-gray-800">Document Summary</td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
                <td className="py-2 px-2 border border-black text-center text-[13px]"></td>
              </tr>

            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 footer-btns">
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
        <button 
          onClick={() => window.open('https://www.gst.gov.in/', '_blank')}
          className="bg-[#4F46E5] hover:bg-[#4338ca] text-white text-[13px] font-medium px-4 py-1.5 rounded-[3px] flex items-center justify-center gap-1.5 shadow-sm transition-colors">
          <ExternalLink className="w-4 h-4" /> Open GSTR Portal
        </button>
      </div>

    </div>
  );
}
