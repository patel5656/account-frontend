import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MessageCircle, Upload } from 'lucide-react';

export function HsnWiseSummary() {
  const navigate = useNavigate();

  const handleExportCSV = () => {
    const csvContent = [
      ['HSN SLAB', 'GST %', 'Sales Taxable Amount', 'Sales Tax', 'Sales Total', 'Purchase Taxable Amount', 'Purchase Tax', 'Purchase Total'],
      ['Totals :', '', '0', '0', '0', '0', '0', '0']
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hsn_wise_summary.csv";
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
      <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-4">
        <label className="text-[13px] font-bold text-gray-800 block mb-1.5">Select Period</label>
        <select className="h-[32px] border border-gray-300 rounded-[3px] px-2 text-[13px] outline-none text-gray-700 bg-white w-[250px]">
          <option>Select</option>
        </select>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 w-full overflow-hidden flex-1">
        
        {/* Header */}
        <div className="text-center py-4 border-b border-gray-200">
          <h2 className="text-[14px] text-gray-700 mb-1">HSN-wise Summary</h2>
          <p className="text-[14px] font-bold text-gray-800">From 24-May-2026 to 24-May-2026</p>
        </div>

        {/* Table */}
        <div className="p-4 w-full">
          <div className="table-scroll w-full overflow-x-auto">
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
              <tr>
                <td className="py-2.5 px-3 border border-black text-[13px] font-bold text-gray-800 text-left">Totals :</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800"></td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
                <td className="py-2.5 px-3 border border-black text-[13px] text-gray-800 text-right">0</td>
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
