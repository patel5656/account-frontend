import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Filter, Upload, BarChart2 } from 'lucide-react';

export function ItemQuantityReport() {
  const navigate = useNavigate();

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Party Name,Opening Quantity,Qty In,Qty Out,Profit,Total Qty\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "item_quantity_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#f4f6f9] min-h-[calc(100vh-60px)] flex flex-col">
      {/* Top Teal Bar */}
      <div className="bg-[#4F46E5] px-4 py-[6px] flex justify-between items-center text-white">
        <h2 className="text-[14.5px] font-medium tracking-wide">Item Quantity Report</h2>
        
        <div className="flex flex-wrap items-center gap-1.5 ml-2">
          <button 
            onClick={handleExport}
            className="bg-[#ffc107] hover:bg-[#e0a800] text-gray-900 px-3 py-[5px] rounded-[3px] text-[12px] font-bold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-[14px] h-[14px]" strokeWidth={2.5} /> Export
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-2 py-[5px] rounded-[3px] flex items-center justify-center transition-colors ml-1"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Search Header */}
        <div className="p-4 bg-[#e9ecef] border-b border-gray-300">
          <div className="flex flex-wrap items-center gap-3 w-full max-w-2xl">
            <div className="flex flex-1 border border-gray-300 rounded-[3px] overflow-hidden">
              <div className="bg-[#e9ecef] px-3 flex items-center justify-center border-r border-gray-300">
                <Filter className="w-4 h-4 text-[#007bff]" strokeWidth={2.5} />
              </div>
              <select className="w-[180px] bg-[#e9ecef] border-r border-gray-300 px-2 py-[5px] text-[13px] outline-none text-gray-700">
                <option>Party Name</option>
              </select>
              <input 
                type="text" 
                placeholder="Search for Party Name" 
                className="flex-1 px-3 py-[5px] text-[13px] outline-none text-gray-700 placeholder-gray-400 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Opening Quantity Box */}
        <div className="bg-white p-4">
          <div className="bg-[#343a40] text-white rounded-[4px] p-3 flex justify-between items-center mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <BarChart2 className="w-4 h-4 text-gray-300" />
              <span className="text-[13px] font-bold text-gray-300">Opening Quantity</span>
            </div>
            <div className="bg-[#495057] px-3 py-1 rounded-[12px] text-[12px] font-bold">
              0
            </div>
          </div>
        </div>

        {/* Totals Bar */}
        <div className="bg-[#212529] text-gray-300 px-6 py-2 flex flex-wrap justify-between items-center gap-4 text-[12px] font-bold uppercase border-y border-gray-600">
          <div>TOTAL QTY IN: <span className="text-white ml-1">0</span></div>
          <div>TOTAL QTY OUT: <span className="text-white ml-1">0</span></div>
          <div>TOTAL PROFIT: <span className="text-white ml-1">0</span></div>
          <div>TOTAL QTY: <span className="text-white ml-1">0</span></div>
        </div>

        {/* Table Area (Empty as per screenshot) */}
        <div className="flex-1 bg-white">
          {/* Empty space where table would be */}
        </div>
      </div>
    </div>
  );
}
